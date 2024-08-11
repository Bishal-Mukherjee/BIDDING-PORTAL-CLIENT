/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import {
  Box,
  Grid,
  Stack,
  Alert,
  Divider,
  Backdrop,
  Typography,
  CircularProgress,
} from '@mui/material';

import { useTaskStore } from 'src/stores/company';
import { apiGetProfileByEmail } from 'src/firebase/firestore/commons';

import { AttachmentList, AttachmentCard, TaskActiveBadge } from 'src/components/commons';
import {
  ActionDialog,
  ViewBidDialog,
  PlaceBidDialog,
  ClientDetailsDialog,
  MarkAsInProgressDialog,
} from 'src/components/company';

const EXPIRY_IN_HOURS = 72; // need to place a bid within 72 hours

export const TaskWrapper = () => {
  const params = useParams();

  const { selectedTask, isLoading, getTaskById } = useTaskStore();

  const activationTime = dayjs(selectedTask?.task?.activationDate);
  const remainingTime = dayjs().diff(activationTime, 'hours');

  const [open, setOpen] = useState(false);
  const [openMarkInProgressDialog, setOpenMarkInProgressDialog] = useState(false);
  const [clientInfo, setClientInfo] = useState({});

  const isOpen = selectedTask?.task?.status === 'created';
  const isAssigned = selectedTask?.task?.status === 'assigned';
  const isInProgress = selectedTask?.task?.status === 'in-progress';

  const handleGetClientInfo = async () => {
    if (selectedTask?.task) {
      const { email } = selectedTask.task;
      const response = await apiGetProfileByEmail({ email });
      setClientInfo(response);
    }
  };

  useEffect(() => {
    if (params.taskId) {
      getTaskById({ id: params.taskId });
    }
  }, [getTaskById, params.taskId]);

  useEffect(() => {
    handleGetClientInfo();
    if (isAssigned) {
      setOpenMarkInProgressDialog(true);
    }
  }, [selectedTask]);

  return (
    <>
      <Helmet>
        <title> Task #{params.taskId} </title>
      </Helmet>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Stack
        direction="column"
        width="100%"
        minHeight={108}
        bgcolor="#F9F6EF"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3" fontFamily="Poppins">
          Bid Overview
        </Typography>
        <Typography variant="body2" textAlign="center" fontFamily="Wix Madefor Display">
          Get an overview of the client ticket.
        </Typography>
      </Stack>

      <Box sx={{ m: 4 }}>
        <Grid container spacing={2} justifyContent="center" flexWrap="wrap">
          <Grid item xs={12} md={5}>
            <Stack direction="row" width="100%" height="100%" spacing={2}>
              <Stack direction="column" alignItems="center" width="100%" height="100%">
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
                      Task #{selectedTask?.task?.id}
                    </Typography>
                    <TaskActiveBadge isActive={selectedTask?.task?.isActive} />
                  </Stack>

                  {isEmpty(selectedTask?.taskAcceptance) ? (
                    <ActionDialog />
                  ) : (
                    <Stack direction="row" alignItems="center" gap={1}>
                      {isEmpty(selectedTask?.bids) ? (
                        <PlaceBidDialog />
                      ) : (
                        <>
                          <ViewBidDialog />
                          {selectedTask?.bids?.length < 3 && isOpen && <PlaceBidDialog />}
                        </>
                      )}
                    </Stack>
                  )}
                </Stack>

                {selectedTask?.taskAcceptance?.status === 'accepted' &&
                isEmpty(selectedTask?.bids) ? (
                  <Alert
                    severity="error"
                    sx={{
                      width: '100%',
                      mt: 2,
                      alignItems: 'center',
                    }}
                  >
                    As you have accepted this task, please submit your bid within&nbsp;
                    <Typography component="span" sx={{ fontWeight: 600 }}>
                      {EXPIRY_IN_HOURS - remainingTime <= 0 ? 0 : EXPIRY_IN_HOURS - remainingTime}{' '}
                      hours
                    </Typography>
                  </Alert>
                ) : null}

                <Typography sx={{ mt: 4 }} variant="h4">
                  {selectedTask?.task?.title}
                </Typography>

                <Divider sx={{ my: 2, width: { md: '100%', xs: '100%' } }} />

                <Box width="100%">
                  <Typography sx={{ mt: 0 }} fontSize={16} variant="body1" textAlign="left">
                    {isEmpty(selectedTask?.task?.description)
                      ? 'No description found'
                      : selectedTask?.task?.description}
                  </Typography>
                </Box>

                <Stack direction="column" justifyContent="center" mt={4} width="100%">
                  <Stack direction="row" alignItems="center" gap={2}>
                    <Typography color="#6c757d" variant="body2">
                      Created on:
                    </Typography>
                    <Typography color="#212529" fontWeight={500}>
                      {dayjs(selectedTask?.createdAt).format('MMM DD, YYYY')}
                    </Typography>
                  </Stack>

                  {(isAssigned || isInProgress) && (
                    <Stack direction="row" alignItems="center" gap={2}>
                      <Typography color="#6c757d" variant="body2">
                        Client details:
                      </Typography>
                      <Box onClick={() => setOpen(true)} sx={{ cursor: 'pointer' }}>
                        <Typography color="#212529" fontWeight={500}>
                          {clientInfo?.firstName} {clientInfo?.lastName}
                        </Typography>
                      </Box>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center" flexWrap="wrap" mt={1}>
          {!isEmpty(selectedTask?.task?.images) && (
            <Grid item xs={12} md={5}>
              <Typography variant="h5">Attachments</Typography>
              <AttachmentList images={selectedTask?.task?.images} />
            </Grid>
          )}
        </Grid>

        <Grid container spacing={2} justifyContent="center" flexWrap="wrap" mt={2}>
          {!isEmpty(selectedTask?.task?.attachments) && (
            <Grid item xs={12} md={5}>
              <Stack direction="row" gap={1} flexWrap="wrap">
                {selectedTask?.task?.attachments?.map((attachment, index) => (
                  <AttachmentCard attachment={attachment} index={index + 1} />
                ))}
              </Stack>
            </Grid>
          )}
        </Grid>

        <ClientDetailsDialog open={open} setOpen={setOpen} clientDetails={clientInfo} />

        <MarkAsInProgressDialog
          open={openMarkInProgressDialog}
          setOpen={setOpenMarkInProgressDialog}
        />
      </Box>
    </>
  );
};
