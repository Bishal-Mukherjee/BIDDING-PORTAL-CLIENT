/* eslint-disable import/no-extraneous-dependencies */
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { v4 as uuid } from 'uuid';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import { useState, useCallback } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Stack,
  Drawer,
  Tooltip,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';

import { storage } from 'src/firebase/config';
import { useTaskStore } from 'src/stores/client';
import { useAuth } from 'src/context/authContext';
import { apiPostCreateIssue } from 'src/services/client';
import { apiUpdateUserAddress } from 'src/firebase/firestore/client';

import Iconify from 'src/components/iconify';

import { AddressDialog } from '../address-dialog/address-dialog';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
});

export const CreateAnIssue = () => {
  const { user } = useAuth();
  const { getAllTasks } = useTaskStore();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      title: '',
      description: '',
      address: {},
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await apiPostCreateIssue({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          title: values.title,
          description: values.description,
          images: uploadedFiles,
          address: values.address,
        });
        setIsLoading(false);
        formik.resetForm();
        setUploadedFiles([]);
        getAllTasks({});
        setOpen(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    },
  });

  const handleAddAddress = async (paramsAddress) => {
    let response = '';
    if (isEmpty(user?.address) || JSON.stringify(user?.address) !== JSON.stringify(paramsAddress)) {
      response = await apiUpdateUserAddress({ email: user.email, address: paramsAddress });
    }
    formik.setFieldValue('address', paramsAddress);
    return response;
  };

  const handleDrop = useCallback(async (acceptedFiles) => {
    setShowLoader(true);
    const uploadPromises = acceptedFiles.map(
      (file) =>
        new Promise((resolve, reject) => {
          const id = uuid();
          const storageRef = ref(storage, `/images/${id}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            'state_changed',
            () => {},
            (error) => {
              console.log(error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        })
    );

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, ...uploadedUrls]);
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoader(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*',
  });

  return (
    <>
      <Tooltip title="Help Ticket">
        <IconButton onClick={() => setOpen(true)}>
          <Iconify icon="ion:create" />
        </IconButton>
      </Tooltip>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ minWidth: { lg: 400, sm: 360, xs: 360 }, m: 1, height: '100%' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2}>
            <Typography variant="h4" fontFamily="Poppins">
              Help Ticket
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <Iconify icon="mdi:close" />
            </IconButton>
          </Stack>

          <form onSubmit={formik.handleSubmit}>
            <Stack
              spacing={2}
              mt={2}
              direction="column"
              width="100%"
              height="100%"
              justifyContent="flex-start"
            >
              <TextField
                name="title"
                label="Title"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                fullWidth
              />

              <TextField
                name="description"
                label="Description"
                placeholder="Description (optional)"
                onChange={formik.handleChange}
                value={formik.values.description}
                fullWidth
                rows={4}
                multiline
              />

              <Box
                sx={{
                  bgcolor: '#F4F6F8',
                  px: 5,
                  mt: 0.5,
                  height: 180,
                  borderRadius: 2,
                  borderStyle: 'dotted',
                  borderColor: isDragActive ? '#007B55' : '#919EAB',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                  }}
                  {...getRootProps({ className: 'dropzone' })}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <Typography>Drop the files here ...</Typography>
                  ) : (
                    <>
                      {uploadedFiles.length > 0 ? (
                        <Box sx={{ display: 'flex' }}>
                          <Iconify icon="tabler:file-filled" width={20} />
                          <Typography>{uploadedFiles.length} files</Typography>
                        </Box>
                      ) : (
                        <>
                          {showLoader ? (
                            <CircularProgress size={15} sx={{ color: 'black' }} />
                          ) : (
                            <Typography textAlign="center" color="#6c757d">
                              Drag &apos;n&apos; drop some files here, <br /> or click to select
                              files ( optional )
                            </Typography>
                          )}
                        </>
                      )}
                    </>
                  )}
                </Box>
              </Box>

              <AddressDialog handleAddAddress={handleAddAddress} />

              <LoadingButton
                fullWidth
                size="medium"
                type="submit"
                variant="contained"
                color="inherit"
                loading={isLoading}
                disabled={isLoading || isEmpty(formik.values.address)}
              >
                Submit
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Drawer>
    </>
  );
};
