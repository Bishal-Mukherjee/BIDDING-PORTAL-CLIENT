import { uniqBy, isEmpty } from 'lodash';
import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { Tab, Box, Tabs, Grid, Stack, Backdrop, Typography, CircularProgress } from '@mui/material';

import { useTaskStore } from 'src/stores/admin';

import Iconify from 'src/components/iconify/iconify';
import { StatusChip, TaskActiveBadge } from 'src/components/commons';

import { TaskBids } from './task-bids';
import { TaskDetails } from './task-details';

export const TaskDetailedView = () => {
  const params = useParams();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const resourceType = searchParams.get('resourceType') || 'task';

  const { isLoading, getTaskById, selectedTask, selectedTaskBids } = useTaskStore();

  const [tabIndex, setTabIndex] = useState(0);

  const totalBiddingCompanies = isEmpty(uniqBy(selectedTaskBids, 'bidder.email'))
    ? 0
    : uniqBy(selectedTaskBids, 'bidder.email')?.length;

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    if (resourceType === 'bid') {
      setTabIndex(1);
    }
  }, [resourceType]);

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

      <Grid
        container
        spacing={2}
        justifyContent="center"
        flexWrap="wrap"
        sx={{ px: { lg: 0, sm: 2, xs: 2 } }}
      >
        <Grid item xs={12} md={6}>
          <Stack mt={1} direction="column" width="100%" justifyContent="center" alignItems="center">
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
              <Tabs
                value={tabIndex}
                onChange={handleChangeTab}
                sx={{ height: 60, borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab
                  icon={<Iconify icon="majesticons:tickets" />}
                  iconPosition="start"
                  label="Client"
                  disableRipple
                />
                <Tab
                  icon={<Iconify icon="pepicons-pencil:raise-hand-circle-filled" />}
                  iconPosition="start"
                  label={`Bids (${totalBiddingCompanies})`}
                  disableRipple
                />
              </Tabs>
            </Box>

            <Stack
              direction="row"
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
          </Stack>
        </Grid>
      </Grid>

      {tabIndex === 0 ? <TaskDetails /> : <TaskBids />}
    </>
  );
};
