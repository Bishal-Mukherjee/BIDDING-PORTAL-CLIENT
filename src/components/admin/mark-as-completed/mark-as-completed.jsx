import * as React from 'react';
import { useParams } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import { apiUpdateTaskStatus } from 'src/services/admin';

import Iconify from 'src/components/iconify';

export const MarkAsCompleted = () => {
  const params = useParams();

  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAsCompleted = async () => {
    setIsLoading(true);
    try {
      await apiUpdateTaskStatus({ id: params?.taskId, status: 'completed' });
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<Iconify icon="mdi:check" />}
          sx={{ bgcolor: '#28a745' }}
          onClick={handleOpen}
        >
          Mark as completed
        </Button>
      </Box>

      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle textAlign="center" variant="h5">
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="center" color="text.secondary" variant="body2">
            Are you sure you want to mark task{' '}
            <Typography color="primary" component="span">
              #{params?.taskId}
            </Typography>{' '}
            as completed ?
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
            onClick={handleMarkAsCompleted}
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
