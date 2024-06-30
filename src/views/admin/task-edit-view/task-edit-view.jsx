/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { v4 as uuid } from 'uuid';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import React, { useState, useEffect, useCallback } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  Stack,
  //   styled,
  Switch,
  Tooltip,
  Backdrop,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';

// import { useRouter } from 'src/routes/hooks';

import { storage } from 'src/firebase/config';
import { useTaskStore } from 'src/stores/admin';
import { apiUpdateTask, apiPutActivateTask } from 'src/services/admin';

import Iconify from 'src/components/iconify';
import { StatusChip, AttachmentList, TaskActiveBadge } from 'src/components/commons';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
});

export const TaskEditView = () => {
  const params = useParams();
  //   const router = useRouter();

  const { selectedTask, getTaskById } = useTaskStore();

  const [showLoader, setShowLoader] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [showFileUploadError, setShowFileUploadError] = useState(false);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: async (values) => {
      setSubmitLoader(true);
      const response = await apiUpdateTask({
        id: selectedTask.id,
        title: values.title,
        description: values.description,
        images: uploadedFiles,
      });
      if (response) {
        getTaskById({ id: selectedTask.id });
      }
      setSubmitLoader(false);
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
  });

  //   const handleDeleteTask = async () => {
  //     const response = await apiDeleteTask({ id: selectedTask.id });
  //     if (response) router.push('/client/analytics');
  //   };

  const onDelete = (index) => {
    const images = existingFiles.filter((_, i) => i !== index);
    setExistingFiles([...images]);
  };

  const handleActivateTask = async () => {
    setIsLoading(true);
    await apiPutActivateTask({ id: selectedTask.id });
    getTaskById({ id: selectedTask.id });
    setIsLoading(false);
  };

  useEffect(() => {
    formik.setValues({
      title: selectedTask?.title,
      description: selectedTask?.description,
    });
    setExistingFiles(selectedTask?.images);
  }, [selectedTask]);

  useEffect(() => {
    if (params.taskId) {
      setIsLoading(true);
      getTaskById({ id: params.taskId });
      setIsLoading(false);
    }
  }, [getTaskById, params.taskId]);

  return (
    <>
      <Helmet>
        <title> Task #{params.taskId} </title>
      </Helmet>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box m={4}>
        <Grid container spacing={2} justifyContent="center" flexWrap="wrap">
          <Grid item xs={12} md={5}>
            <Stack direction="row" width="100%" height="100%" spacing={2}>
              <Stack direction="column" width="100%" height="100%">
                <Stack
                  direction="row"
                  spacing={4}
                  justifyContent="space-between"
                  alignItems="center"
                  mt={2}
                  width="100%"
                >
                  <Stack direction="column" justifyContent="center" alignItems="flex-start" gap={1}>
                    <Stack
                      direction="row"
                      width="100%"
                      justifyContent="flex-start"
                      alignItems="center"
                      gap={2}
                    >
                      <Typography color="#00008B" variant="subtitle1">
                        Task #{selectedTask?.id}
                      </Typography>
                      <TaskActiveBadge isActive={selectedTask?.isActive} />
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={2}>
                      <StatusChip variant={selectedTask?.status} />
                      <Tooltip title={selectedTask?.isActive ? '' : 'Activate Task'}>
                        <Switch
                          disabled={selectedTask?.isActive}
                          onChange={handleActivateTask}
                          checked={selectedTask?.isActive}
                        />
                      </Tooltip>
                    </Stack>
                  </Stack>

                  {/* <Button
                    variant="contained"
                    color="error"
                    startIcon={<Iconify icon="mdi:delete" />}
                    onClick={handleDeleteTask}
                  >
                    Delete
                  </Button> */}
                </Stack>

                <form onSubmit={formik.handleSubmit}>
                  <Stack spacing={2} mt={4} direction="column" width="100%" height="100%">
                    <TextField
                      name="title"
                      label="Title"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                      error={formik.touched.title && Boolean(formik.errors.title)}
                      helperText={formik.touched.title && formik.errors.title}
                      fullWidth
                      disabled={selectedTask?.isActive}
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
                      disabled={selectedTask?.isActive}
                    />

                    {selectedTask?.isActive ? (
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        bgcolor="#F4F6F8"
                        px={5}
                        mt={0}
                        height={180}
                        borderRadius={2}
                        borderColor={isDragActive ? '#007B55' : '#919EAB'}
                        display={selectedTask?.isActive ? 'flex' : 'none'}
                      >
                        <Typography
                          textAlign="center"
                          color="#d90429"
                          fontFamily="Wix Madefor Display"
                        >
                          Task is active, further image uploads are restricted.
                        </Typography>
                      </Stack>
                    ) : (
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
                                      {selectedTask?.isActive ? (
                                        <Typography
                                          textAlign="center"
                                          color="#d90429"
                                          variant="subtitle2"
                                        >
                                          Task is active, further image uploads are restricted.
                                        </Typography>
                                      ) : (
                                        <>
                                          {showFileUploadError ? (
                                            <Typography
                                              textAlign="center"
                                              color="#d90429"
                                              variant="subtitle2"
                                            >
                                              Invalid file type. Only images are allowed.
                                            </Typography>
                                          ) : (
                                            <Typography
                                              textAlign="center"
                                              color="#6c757d"
                                              variant="subtitle2"
                                            >
                                              Drag &apos;n&apos; drop some files here, <br /> or
                                              click to select files ( optional )
                                            </Typography>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </Box>
                      </Box>
                    )}

                    <Grid container gap={6} flexWrap="wrap">
                      <AttachmentList
                        images={existingFiles}
                        onDelete={onDelete}
                        hideDeleteIcon={selectedTask?.isActive}
                      />
                    </Grid>

                    <LoadingButton
                      fullWidth
                      size="medium"
                      type="submit"
                      variant="contained"
                      color="inherit"
                      loading={submitLoader}
                      disabled={selectedTask?.isActive}
                    >
                      Submit
                    </LoadingButton>
                  </Stack>
                </form>

                <Stack direction="column" justifyContent="center" mt={4} width="100%">
                  <Stack direction="row" alignItems="center" gap={2}>
                    <Typography color="#6c757d" variant="body2">
                      Created on:
                    </Typography>
                    <Typography color="#212529" fontWeight={500}>
                      {dayjs(selectedTask?.createdAt).format('MMM DD, YYYY')}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={2}>
                    <Typography color="#6c757d" variant="body2">
                      Assigned to:
                    </Typography>
                    {isEmpty(selectedTask?.assignedTo) ? (
                      <Typography color="#212529" fontWeight={500}>
                        No assignee found
                      </Typography>
                    ) : (
                      <Typography color="#212529" fontWeight={500}>
                        {selectedTask?.assignedTo}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
