/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Box, Grid, Stack, Divider, Backdrop, Typography, CircularProgress } from '@mui/material';

import { useTaskStore } from 'src/stores/client';
import { apiGetProfileByEmail } from 'src/firebase/firestore/commons';

import { CompanyDetailsDialog } from 'src/components/client';
import { StatusChip, AttachmentList, TaskActiveBadge } from 'src/components/commons';

export const TaskDetailedView = () => {
  const params = useParams();

  const { selectedTask, isLoading, getTaskById } = useTaskStore();

  const [open, setOpen] = useState(false);
  const [assignedTo, setAssignedTo] = useState({});

  const handleGetAssignedTo = async () => {
    if (selectedTask?.assignedTo?.email) {
      const response = await apiGetProfileByEmail({ email: selectedTask?.assignedTo?.email });
      setAssignedTo(response);
    }
  };

  useEffect(() => {
    handleGetAssignedTo();
  }, [selectedTask]);

  useEffect(() => {
    if (params.taskId) {
      getTaskById({ id: params.taskId });
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

      <Box sx={{ m: 4 }}>
        <Grid container spacing={2} justifyContent="center" flexWrap="wrap">
          <Grid item xs={12} md={5}>
            <Stack direction="row" width="100%" height="100%" spacing={2}>
              <Stack
                direction="column"
                alignItems="flex-start"
                justifyContent="flex-start"
                width="100%"
                height="100%"
              >
                <Stack
                  direction="row"
                  spacing={4}
                  justifyContent="space-between"
                  alignItems="center"
                  mt={2}
                  width="100%"
                >
                  <Stack direction="row" alignItems="center" gap={2}>
                    <Typography color="#00008B" variant="subtitle1">
                      Task #{selectedTask?.id}
                    </Typography>
                    <TaskActiveBadge isActive={selectedTask?.isActive} />
                  </Stack>
                  <StatusChip variant={selectedTask?.status} />
                </Stack>

                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ mt: 4 }} variant="h4" textAlign="center">
                    {selectedTask?.title}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2, width: { md: '100%', xs: '100%' } }} />

                <Typography sx={{ mt: 0 }} fontSize={16} variant="body1">
                  {isEmpty(selectedTask?.description)
                    ? 'No description found'
                    : selectedTask?.description}
                </Typography>

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
                      <Box onClick={() => setOpen(true)} sx={{ cursor: 'pointer' }}>
                        <Typography
                          color="#212529"
                          fontWeight={500}
                          sx={{ ':hover': { textDecoration: 'underline' } }}
                        >
                          {selectedTask?.assignedTo?.name}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        {!isEmpty(selectedTask?.images) && (
          <Grid container spacing={2} justifyContent="center" flexWrap="wrap" mt={4}>
            <Grid item xs={12} md={5}>
              <Typography variant="h5">Attachments</Typography>
              <Grid container gap={2} flexWrap="wrap" mt={0}>
                <AttachmentList images={selectedTask?.images} />
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid container spacing={2} justifyContent="center" flexWrap="wrap" mt={2}>
          {!isEmpty(selectedTask?.attachments) && (
            <Grid item xs={12} md={5}>
              <Stack direction="column" gap={1}>
                {selectedTask?.attachments?.map((attachment, index) => (
                  <a href={attachment} target="_blank" rel="noreferrer">
                    <Typography variant="body2">
                      {index + 1}.&nbsp;{attachment}
                    </Typography>
                  </a>
                ))}
              </Stack>
            </Grid>
          )}
        </Grid>
      </Box>

      <CompanyDetailsDialog open={open} setOpen={setOpen} companyDetails={assignedTo} />
    </>
  );
};
