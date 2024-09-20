import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';
import React, { useMemo, useState } from 'react';

import { Box, Grid, Stack, Divider, MenuItem, TextField, Typography } from '@mui/material';

import { wrapDescriptionText } from 'src/utils';
import { useTaskStore } from 'src/stores/admin';
import { apiUnassignTask, apiUpdateTaskStatus } from 'src/services/admin';

import { UpdateTaskStatus } from 'src/components/admin';
import { AttachmentList, AttachmentCard } from 'src/components/commons';

const Status = [
  { label: 'Open', value: 'created' },
  { label: 'Completed', value: 'completed' },
];

export const TaskDetails = () => {
  const params = useParams();

  const { selectedTask } = useTaskStore();
  const isAssigned = selectedTask?.status === 'assigned';
  const isInProgress = selectedTask?.status === 'in-progress';

  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const isUnspacedDescription = useMemo(() => {
    if (!isEmpty(selectedTask?.description)) {
      if (!selectedTask?.description.includes(' ')) {
        return true;
      }
    }
    return false;
  }, [selectedTask?.description]);

  const handleChange = (value) => {
    setStatus(value);
  };

  const onConfirmation = async (tempStatus) => {
    if (tempStatus === 'completed') {
      setIsLoading(true);
      try {
        await apiUpdateTaskStatus({ id: params?.taskId, status: 'completed' });
        setIsLoading(false);
        window.location.reload();
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    } else if (tempStatus === 'created') {
      setIsLoading(true);
      try {
        await apiUnassignTask({ id: params?.taskId });
        setIsLoading(false);
        window.location.reload();
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

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
                  {isEmpty(selectedTask?.description) ? (
                    'No description found'
                  ) : (
                    <>
                      {isUnspacedDescription
                        ? wrapDescriptionText(selectedTask?.description)
                        : selectedTask?.description}
                    </>
                  )}
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
                      {selectedTask?.assignedTo?.name}
                    </Typography>
                  )}
                </Stack>

                <Stack justifyContent="space-between">
                  {(isAssigned || isInProgress) && (
                    <TextField
                      select
                      value={status}
                      size="small"
                      sx={{ width: 240, mt: 2 }}
                      label="Status"
                      onChange={(e) => handleChange(e.target.value)}
                    >
                      {Status.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}

                  {status && (
                    <UpdateTaskStatus
                      open={status}
                      onClose={() => setStatus('')}
                      requiredStatus={status}
                      onConfirmation={() => onConfirmation(status)}
                      isLoading={isLoading}
                    />
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" flexWrap="wrap" mt={0} px={2}>
        {!isEmpty(selectedTask?.images) && (
          <Grid item xs={12} md={6}>
            <Typography variant="h5">Attachments</Typography>
            <AttachmentList images={selectedTask?.images} />
          </Grid>
        )}
      </Grid>

      <Grid container spacing={2} justifyContent="center" flexWrap="wrap" px={2} mt={2}>
        {!isEmpty(selectedTask?.attachments) && (
          <Grid item xs={12} md={6}>
            <Stack direction="row" gap={1} flexWrap="wrap">
              {selectedTask?.attachments?.map((attachment, index) => (
                <AttachmentCard attachment={attachment} index={index + 1} />
              ))}
            </Stack>
          </Grid>
        )}
      </Grid>
    </>
  );
};
