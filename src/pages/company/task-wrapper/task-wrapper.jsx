import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

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

import { TaskActiveBadge } from 'src/components/commons';
import { ActionDialog, ViewBidDialog, PlaceBidDialog } from 'src/components/company';

const EXPIRY_IN_HOURS = 72; // need to place a bid within 72 hours

export const TaskWrapper = () => {
  const params = useParams();

  const { selectedTask, isLoading, getTaskById } = useTaskStore();

  const activationTime = dayjs(selectedTask?.task?.activationDate);
  const remainingTime = dayjs().diff(activationTime, 'hours');

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

      <Stack
        direction="column"
        width="100%"
        minHeight={108}
        bgcolor="#F9F6EF"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3" fontFamily="Poppins">
          Ticket Overview
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
                    <Typography color="#00008B" fontFamily="Wix Madefor Display">
                      Task #{selectedTask?.task?.id}
                    </Typography>
                    <TaskActiveBadge isActive={selectedTask?.task?.isActive} />
                  </Stack>

                  {isEmpty(selectedTask?.taskAcceptance) ? (
                    <ActionDialog />
                  ) : (
                    <>{!isEmpty(selectedTask?.bid) ? <ViewBidDialog /> : <PlaceBidDialog />}</>
                  )}
                </Stack>

                {selectedTask?.taskAcceptance?.status === 'accepted' &&
                isEmpty(selectedTask?.bid) ? (
                  <Alert
                    severity="error"
                    sx={{
                      width: '100%',
                      fontFamily: 'Wix Madefor Display',
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

                <Typography sx={{ mt: 4 }} fontSize={20} fontFamily="Poppins">
                  {selectedTask?.task?.title}
                </Typography>

                <Divider sx={{ my: 2, width: { md: '100%', xs: '100%' } }} />

                <Typography sx={{ mt: 0 }} fontSize={16} fontFamily="Wix Madefor Display">
                  {isEmpty(selectedTask?.task?.description)
                    ? 'No description found'
                    : selectedTask?.task?.description}
                </Typography>

                <Stack direction="column" justifyContent="center" mt={4} width="100%">
                  <Stack direction="row" alignItems="center" gap={2}>
                    <Typography color="#6c757d" fontFamily="Wix Madefor Display">
                      Created on:
                    </Typography>
                    <Typography color="#212529" fontFamily="Poppins" fontWeight={500}>
                      {dayjs(selectedTask?.task?.createdAt).format('MMM DD, YYYY')}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center" flexWrap="wrap" mt={4}>
          {!isEmpty(selectedTask?.task?.images) && (
            <Grid item xs={12} md={5}>
              <Typography fontFamily="Wix Madefor Display">Attachments</Typography>
              <Grid container spacing={2} flexWrap="wrap" mt={0}>
                {selectedTask?.task?.images?.map((image) => (
                  <Grid item md={4} sm={12} xs={12}>
                    <img src={image} alt="" width="100%" height={150} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};
