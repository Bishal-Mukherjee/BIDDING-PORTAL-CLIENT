import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { v4 as uuid } from 'uuid';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import { useState, useEffect, useCallback } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Alert, Dialog, TextField, Typography, CircularProgress } from '@mui/material';

import { storage } from 'src/firebase/config';
import { useAuth } from 'src/context/authContext';
import { apiPostCompanyMetaInfo } from 'src/firebase/firestore/company';

import Iconify from 'src/components/iconify';

const validationSchema = yup.object().shape({
  searchLink: yup.string().required('*required'),
  companyBio: yup.string().required('*required'),
});

export const MetaInfoDialog = () => {
  const { isLoggedIn, user } = useAuth();

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showFileUploadError, setShowFileUploadError] = useState(false);
  const [alert, setAlert] = useState('');

  const formik = useFormik({
    validationSchema,
    initialValues: {
      searchLink: '',
      companyBio: '',
    },
    onSubmit: async (values) => {
      if (!isEmpty(uploadedFiles)) {
        setIsLoading(true);
        apiPostCompanyMetaInfo({ email: user.email, logo: uploadedFiles[0], ...values });
        setIsLoading(false);
      } else {
        setAlert('Please upload company logo');
      }
    },
  });

  const handleDrop = useCallback(async (acceptedFiles) => {
    setShowLoader(true);
    const uploadPromises = acceptedFiles.map(
      (file) =>
        new Promise((resolve, reject) => {
          if (!file.type.startsWith('image/')) {
            setShowLoader(false);
            setShowFileUploadError(true);
            reject(new Error('Invalid file type. Only images are allowed.'));
            return;
          }

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
    multiple: false,
  });

  useEffect(() => {
    if (isLoggedIn) {
      if (!isEmpty(user) && !user?.metaInfo) {
        setOpen(true);
      }
    }
  }, [isLoggedIn, user]);

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="column"
        width="100%"
        py={4}
        spacing={6}
      >
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <Stack direction="column" width="100%" gap={2} px={4}>
            <Typography variant="h5">Add Company Info</Typography>

            {alert && <Alert severity="error">{alert}</Alert>}
            <TextField
              name="searchLink"
              placeholder="Paste your company's search link ( https://g.co/kgs/abcd )"
              value={formik.values.searchLink}
              onChange={formik.handleChange}
              error={formik.touched.searchLink && Boolean(formik.errors.searchLink)}
              helperText={formik.touched.searchLink && formik.errors.searchLink}
            />

            <TextField
              multiline
              rows={2}
              name="companyBio"
              placeholder="Tell us about your company's mission and values..."
              value={formik.values.companyBio}
              onChange={formik.handleChange}
              error={formik.touched.companyBio && Boolean(formik.errors.companyBio)}
              helperText={formik.touched.companyBio && formik.errors.companyBio}
            />

            <Box
              sx={{
                bgcolor: '#F4F6F8',
                px: 5,
                mt: 0.5,
                height: 200,
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
                          <>
                            {showFileUploadError ? (
                              <Typography textAlign="center" color="#d90429" variant="subtitle1">
                                Invalid file type. Only images are allowed.
                              </Typography>
                            ) : (
                              <Typography textAlign="center" color="#6c757d" variant="subtitle1">
                                Drag &apos;n&apos; drop or click to select company logo
                              </Typography>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </Box>
            </Box>
            <LoadingButton type="submit" variant="contained" color="inherit" loading={isLoading}>
              Submit
            </LoadingButton>
          </Stack>
        </form>
      </Stack>
    </Dialog>
  );
};
