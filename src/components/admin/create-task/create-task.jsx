import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Chip,
  Stack,
  Drawer,
  Tooltip,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
  FormHelperText,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

import { storage } from 'src/firebase/config';
import { apiPostCreateIssue } from 'src/services/admin';
import { apiGetClient } from 'src/firebase/firestore/admin';
import { apiUpdateUserAddress } from 'src/firebase/firestore/client';
import { useTaskStore, useAdminManagementStore } from 'src/stores/admin';

import Iconify from 'src/components/iconify';

import { AddressDialog } from '../address-dialog/address-dialog';

const CountChip = ({ label = '', value = 0 }) => <Chip label={`${value} 🞄 ${label}`} />;

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
});

export const CreateAnIssue = () => {
  const { getAllTasks } = useTaskStore();
  const { getAllClients, clients } = useAdminManagementStore();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [showFileUploadError, setShowFileUploadError] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});
  const [linkInputs, setLinkInputs] = useState({ attachment: '' });
  const [uploadedLinks, setUploadedLinks] = useState({ attachments: [] });

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
          firstName: selectedClient.firstName,
          lastName: selectedClient.lastName,
          email: selectedClient.email,
          title: values.title,
          description: values.description,
          address: values.address,
          images: uploadedFiles,
          attachments: uploadedLinks.attachments,
        });
        setIsLoading(false);
        formik.resetForm();
        setUploadedFiles([]);
        setUploadedLinks({ attachments: [] });
        getAllTasks({});
        setOpen(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    },
  });

  const clientOptions = useMemo(
    () =>
      clients.map((client) => ({
        label: `${client.firstName} ${client.lastName}`,
        value: client.phoneNumber,
      })),
    [clients]
  );

  const handleLinkInputChange = (e) => {
    setLinkInputs({ ...linkInputs, [e.target.name]: e.target.value });
  };

  const handleLinkSubmit = () => {
    setUploadedLinks({
      ...uploadedLinks,
      attachments: [...uploadedLinks.attachments, linkInputs.attachment],
    });
    setLinkInputs({ ...linkInputs, attachment: '' });
  };

  const handleAddAddress = async (paramsAddress) => {
    let response = {};
    formik.setFieldValue('address', paramsAddress);
    if (
      !isEmpty(selectedClient?.address) ||
      JSON.stringify(selectedClient?.address) !== JSON.stringify(paramsAddress)
    ) {
      response = await apiUpdateUserAddress({
        email: selectedClient.email,
        address: paramsAddress,
      });
    }
    return response;
  };

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
  });

  const handleClientSelection = async (params) => {
    setSelectedClient({});
    formik.setFieldValue('address', {});
    if (!isEmpty(params)) {
      const client = await apiGetClient({ phoneNumber: params.value });
      setSelectedClient({ ...client });
      if (!isEmpty(client?.address)) {
        handleAddAddress(client?.address);
      }
    }
  };

  useEffect(() => {
    getAllClients();
  }, [getAllClients]);

  return (
    <>
      <Tooltip title="Help Ticket">
        <IconButton onClick={() => setOpen(true)}>
          <Iconify icon="ion:create" />
        </IconButton>
      </Tooltip>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ minWidth: { lg: 400, sm: 360, xs: 360 }, m: 1 }}>
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
              <Autocomplete
                options={clientOptions}
                onChange={(_, value) => handleClientSelection(value)}
                renderInput={(params) => <TextField {...params} label="Select Client" />}
                ListboxProps={{
                  sx: {
                    maxHeight: 152,
                    border: 'solid 1px #adb5bd',
                    borderTop: 0,
                    borderRadius: 1,
                  },
                }}
              />

              {isEmpty(selectedClient) && (
                <Stack direction="row" alignItems="center" gap={1}>
                  <Iconify icon="fluent:info-16-filled" color="#ba181b" />
                  <FormHelperText sx={{ color: '#ba181b' }}>Please select a client</FormHelperText>
                </Stack>
              )}

              <TextField
                name="title"
                label="Title"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                fullWidth
                disabled={isEmpty(selectedClient)}
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
                disabled={isEmpty(selectedClient)}
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
                            <>
                              {showFileUploadError ? (
                                <Typography textAlign="center" color="#d90429" variant="subtitle2">
                                  Invalid file type. Only images are allowed.
                                </Typography>
                              ) : (
                                <Typography textAlign="center" color="#6c757d" variant="subtitle2">
                                  Drag &apos;n&apos; drop some files here, <br /> or click to select
                                  files ( optional )
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

              <Typography textAlign="center"> OR </Typography>

              <TextField
                label="Attachment Link"
                name="attachment"
                value={linkInputs.attachment}
                onChange={handleLinkInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleLinkSubmit()}
                        disabled={isEmpty(linkInputs.attachment)}
                        edge="end"
                      >
                        <Iconify icon="icon-park-solid:check-one" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={2}>
                <CountChip
                  label="Attachments"
                  value={parseInt(uploadedLinks?.attachments?.length, 10)}
                />
              </Stack>

              {!isEmpty(selectedClient) && (
                <AddressDialog
                  user={selectedClient}
                  handleAddAddress={handleAddAddress}
                  disabled={isEmpty(selectedClient)}
                />
              )}

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

CountChip.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
};
