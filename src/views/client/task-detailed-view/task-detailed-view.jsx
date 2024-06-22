import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import {
  Box,
  Grid,
  Stack,
  styled,
  Divider,
  Backdrop,
  Typography,
  CircularProgress,
} from '@mui/material';

import { useTaskStore } from 'src/stores/client';

import { StatusChip, ImageViewer, TaskActiveBadge } from 'src/components/commons';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 5,
}));

export const TaskDetailedView = () => {
  const params = useParams();

  const { selectedTask, isLoading, getTaskById } = useTaskStore();

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
                      Task #{selectedTask?.id}
                    </Typography>
                    <TaskActiveBadge isActive={selectedTask?.isActive} />
                  </Stack>
                  <StatusChip variant={selectedTask?.status} />
                </Stack>

                <Typography sx={{ mt: 4 }} fontSize={20} fontFamily="Poppins">
                  {selectedTask?.title}
                </Typography>

                <Divider sx={{ my: 2, width: { md: '100%', xs: '100%' } }} />

                <Typography sx={{ mt: 0 }} fontSize={16} fontFamily="Wix Madefor Display">
                  {isEmpty(selectedTask?.description)
                    ? 'No description found'
                    : selectedTask?.description}
                </Typography>

                <Stack direction="column" justifyContent="center" mt={4} width="100%">
                  <Stack direction="row" alignItems="center" gap={2}>
                    <Typography color="#6c757d" fontFamily="Wix Madefor Display">
                      Created on:
                    </Typography>
                    <Typography color="#212529" fontFamily="Poppins" fontWeight={500}>
                      {dayjs(selectedTask?.createdAt).format('MMM DD, YYYY')}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={2}>
                    <Typography color="#6c757d" fontFamily="Wix Madefor Display">
                      Assigned to:
                    </Typography>
                    {isEmpty(selectedTask?.assignedTo) ? (
                      <Typography color="#212529" fontFamily="Poppins" fontWeight={500}>
                        No assignee found
                      </Typography>
                    ) : (
                      <Typography color="#212529" fontFamily="Poppins" fontWeight={500}>
                        {selectedTask?.assignedTo}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center" flexWrap="wrap" mt={4}>
          {!isEmpty(selectedTask?.images) && (
            <Grid item xs={12} md={5}>
              <Typography fontFamily="Wix Madefor Display">Attachments</Typography>
              <Grid container spacing={2} flexWrap="wrap" mt={0}>
                {selectedTask?.images?.map((image) => (
                  <Grid item md={4} sm={12} xs={12}>
                    <Item elevation={2} py={4} px={4}>
                      <ImageViewer imageURL={image} hideDeleteIcon />
                    </Item>
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
