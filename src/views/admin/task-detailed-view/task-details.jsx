import dayjs from 'dayjs';
import React from 'react';
import { isEmpty } from 'lodash';

import { Box, Grid, Stack, Divider, Typography } from '@mui/material';

import { useTaskStore } from 'src/stores/admin';

import { AttachmentList } from 'src/components/commons';

export const TaskDetails = () => {
  const { selectedTask } = useTaskStore();
  return (
    <>
      <Grid container spacing={2} justifyContent="center" flexWrap="wrap" mt={1} px={2}>
        <Grid item xs={12} md={6}>
          <Stack direction="row" width="100%" height="100%" spacing={2}>
            <Stack direction="column" alignItems="center" width="100%" height="100%">
              <Typography sx={{ mt: 0 }} variant="h4">
                {selectedTask?.title}
              </Typography>

              <Divider sx={{ my: 2, width: { md: '100%', xs: '100%' } }} />

              <Box width="100%">
                <Typography sx={{ mt: 0 }} fontSize={16} variant="body1" textAlign="left">
                  {isEmpty(selectedTask?.description)
                    ? 'No description found'
                    : selectedTask?.description}
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

      <Grid container spacing={2} justifyContent="center" flexWrap="wrap" mt={4} px={2}>
        {!isEmpty(selectedTask?.images) && (
          <Grid item xs={12} md={6}>
            <Typography variant="h5">Attachments</Typography>
            <AttachmentList images={selectedTask?.images} />
          </Grid>
        )}
      </Grid>
    </>
  );
};
