import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import {
  Stack,
  Button,
  Dialog,
  Typography,
  IconButton,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import { useTaskStore } from 'src/stores/company';
import { apiUpdateAcceptOrRejectTask } from 'src/services/company';

import Iconify from 'src/components/iconify';

const EXPIRY_IN_HOURS = 72; // need to accept / reject a task, before placing bid

export const ActionDialog = () => {
  const navigate = useNavigate();

  const { selectedTask, getTaskById } = useTaskStore();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState('');

  const activationTime = dayjs(selectedTask?.task?.activationDate);
  const remainingTime = dayjs().diff(activationTime, 'hours');

  const BID_EXPIRES_IN = EXPIRY_IN_HOURS - remainingTime;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAcceptTask = async () => {
    setIsLoading('accept');
    await apiUpdateAcceptOrRejectTask({
      taskId: selectedTask?.task?.id,
      status: 'accepted',
    });
    setIsLoading('');
    await getTaskById({ id: selectedTask?.task?.id });
    setOpen(false);
  };

  const handleRejectTask = async () => {
    setIsLoading('reject');
    await apiUpdateAcceptOrRejectTask({
      taskId: selectedTask?.task?.id,
      status: 'rejected',
    });
    setIsLoading('');
    setOpen(false);
    navigate('/company/analytics');
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ bgcolor: '#022a5c', fontFamily: 'Wix Madefor Display' }}
        onClick={handleClickOpen}
        disabled={BID_EXPIRES_IN <= 0}
      >
        Accept / Reject
      </Button>

      <Dialog open={open}>
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          px={3}
          py={2}
        >
          <Typography variant="h4">Accept or Reject</Typography>

          <IconButton onClick={() => setOpen(false)}>
            <Iconify icon="mdi:close" />
          </IconButton>
        </Stack>

        <DialogContent>
          <DialogContentText variant="body1">
            Would you like to accept or reject this task? By accepting you are allowed to place
            bids.
          </DialogContentText>

          <Stack direction="row" alignItems="center" mt={4} gap={1}>
            <Iconify icon="ic:twotone-info" />
            <Typography variant="subtitle2" color="red">
              Expires in {BID_EXPIRES_IN} hour(s)
            </Typography>
          </Stack>
        </DialogContent>

        <DialogActions>
          <LoadingButton
            onClick={handleRejectTask}
            variant="text"
            color="error"
            loading={isLoading === 'reject'}
          >
            Reject
          </LoadingButton>
          <LoadingButton
            onClick={handleAcceptTask}
            variant="contained"
            color="inherit"
            loading={isLoading === 'accept'}
          >
            Accept
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
