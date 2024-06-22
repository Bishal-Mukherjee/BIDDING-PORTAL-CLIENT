import * as React from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useTaskStore } from 'src/stores/client';
import { apiDeleteTask } from 'src/services/client';

import Iconify from 'src/components/iconify';

export const TaskDeleteDialog = () => {
  const router = useRouter();

  const { selectedTask } = useTaskStore();

  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteTask = async () => {
    setIsLoading(true);
    const response = await apiDeleteTask({ id: selectedTask.id });
    setIsLoading(false);
    if (response) router.push('/client/analytics');
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        startIcon={<Iconify icon="mdi:delete" />}
        onClick={handleClickOpen}
      >
        Delete
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle textAlign="center">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="center">
            Are you sure you want to delete task{' '}
            <Typography color="primary" component="span">
              #{selectedTask?.id}
            </Typography>
            &nbsp;?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleClose} color="warning">
            Close
          </Button>
          <LoadingButton
            color="inherit"
            variant="contained"
            loading={isLoading}
            onClick={handleDeleteTask}
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
