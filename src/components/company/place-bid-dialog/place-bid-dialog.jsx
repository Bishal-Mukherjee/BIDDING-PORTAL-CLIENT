import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { v4 as uuid } from 'uuid';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import React, { useState, useEffect, useCallback } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Stack,
  Button,
  Drawer,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  FormHelperText,
  CircularProgress,
} from '@mui/material';

import { storage } from 'src/firebase/config';
import { useTaskStore } from 'src/stores/company';
import { useAuth } from 'src/context/authContext';
import { QUALITY_MENU_OPTIONS } from 'src/constants';
import { apiPostCreateBid } from 'src/services/company';

import Iconify from 'src/components/iconify/iconify';

const validationSchema = yup.object().shape({
  amount: yup
    .number()
    .min(1, 'Amount must be greater than 0')
    .typeError('Must be a number')
    .required('Required'),
  quality: yup.string().required('Required'),
  estimatedCompletionDays: yup.number().required('Required'),
});

export const PlaceBidDialog = () => {
  const { user } = useAuth();
  const { selectedTask, getTaskById } = useTaskStore();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showFileUploadError, setShowFileUploadError] = useState(false);
  const [inputErrors, setInputErrors] = useState('');
  const [prevQualities, setPrevQualities] = useState([]);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      amount: 0,
      quality: '',
      estimatedCompletionDays: 0,
    },
    onSubmit: async (values) => {
      if (isEmpty(uploadedFiles)) {
        setInputErrors('Please upload an invoice/receipt');
        return;
      }
      setIsLoading(true);
      await apiPostCreateBid({
        taskId: selectedTask?.task?.id,
        amount: values.amount,
        attachment: uploadedFiles[0],
        estimatedCompletionDays: values.estimatedCompletionDays,
        quality: values.quality,
        logo: user?.metaInfo?.logo,
      });
      setIsLoading(false);
      getTaskById({ id: selectedTask?.task?.id });
      setOpen(false);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInputErrors('');
    formik.resetForm();
  };

  const handleDrop = useCallback(async (acceptedFiles) => {
    setShowLoader(true);
    const uploadPromises = acceptedFiles.map(
      (file) =>
        new Promise((resolve, reject) => {
          const fileType = file.type;
          if (!fileType.includes('image') && !fileType.includes('pdf')) {
            setShowLoader(false);
            setShowFileUploadError(true);
            reject(new Error('Invalid file type. Only image/pdf are allowed.'));
            return;
          }

          const id = uuid();
          const storageRef = ref(storage, `/bid-attachments/${id}`);
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
    if (!isEmpty(selectedTask?.bids)) {
      setPrevQualities(selectedTask?.bids?.map((bid) => bid?.quality));
    }
  }, [selectedTask?.bids]);

  useEffect(
    () => () => {
      setPrevQualities([]);
      setUploadedFiles([]);
      setShowLoader(false);
      setShowFileUploadError(false);
    },
    []
  );

  return (
    <>
      <Button
        variant="contained"
        sx={{ bgcolor: '#022a5c' }}
        onClick={handleClickOpen}
        startIcon={<Iconify icon="pepicons-pencil:raise-hand-circle-filled" />}
      >
        Place Bid
      </Button>

      <Drawer anchor="right" open={open}>
        <Box sx={{ minWidth: { lg: 400, sm: 360, xs: 360 }, m: 1, height: '100%' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2}>
            <Typography variant="h4" fontFamily="Poppins">
              Place a bid
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <Iconify icon="mdi:close" />
            </IconButton>
          </Stack>

          <form onSubmit={formik.handleSubmit}>
            <Stack mt={4} gap={2} width="100%">
              <TextField
                fullWidth
                label="Bid amount"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />

              <TextField
                select
                label="Quality"
                name="quality"
                value={formik.values.quality}
                onChange={formik.handleChange}
                error={formik.touched.quality && Boolean(formik.errors.quality)}
                helperText={formik.touched.quality && formik.errors.quality}
                SelectProps={{ MenuProps: { sx: { ml: 1 } } }}
              >
                {QUALITY_MENU_OPTIONS.map((option) => (
                  <MenuItem
                    key={`quality-${option.value}`}
                    value={option.value}
                    disabled={prevQualities?.includes(option.value)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <Box
                sx={{
                  bgcolor: '#F4F6F8',
                  px: 4,
                  height: 180,
                  borderRadius: 2,
                  borderStyle: 'dotted',
                  borderColor: isDragActive ? '#007B55' : '#919EAB',
                }}
              >
                {!isEmpty(uploadedFiles) ? (
                  <Stack
                    direction="row"
                    width="100%"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <a href={uploadedFiles[0]} target="_blank" rel="noreferrer">
                      Preview
                    </a>

                    <Button onClick={() => setUploadedFiles([])}>
                      <Iconify icon="mdi:close" />
                      <Typography>Clear</Typography>
                    </Button>
                  </Stack>
                ) : (
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
                                  <Typography
                                    textAlign="center"
                                    color="#d90429"
                                    variant="subtitle2"
                                  >
                                    Invalid file type. Only image / pdf are allowed.
                                  </Typography>
                                ) : (
                                  <Typography
                                    textAlign="center"
                                    color="#6c757d"
                                    variant="subtitle2"
                                  >
                                    Drag &apos;n&apos; drop invoice/receipt here, <br /> or click to
                                    select files
                                  </Typography>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </Box>
                )}
              </Box>

              {inputErrors && <FormHelperText error>{inputErrors}</FormHelperText>}

              <TextField
                fullWidth
                label="Estimated time (days)"
                name="estimatedCompletionDays"
                value={formik.values.estimatedCompletionDays}
                onChange={formik.handleChange}
                error={
                  formik.touched.estimatedCompletionDays &&
                  Boolean(formik.errors.estimatedCompletionDays)
                }
                helperText={
                  formik.touched.estimatedCompletionDays && formik.errors.estimatedCompletionDays
                }
              />

              <Stack direction="row" gap={1} alignItems="center" justifyContent="flex-end" mt={0}>
                <Button onClick={handleClose} color="warning">
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="inherit"
                  loading={isLoading}
                >
                  Confirm
                </LoadingButton>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Drawer>
    </>
  );
};
