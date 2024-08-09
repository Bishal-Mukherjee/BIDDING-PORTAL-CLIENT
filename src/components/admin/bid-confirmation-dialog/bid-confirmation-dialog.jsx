import * as React from 'react';
import PropTypes from 'prop-types';

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

import { useTaskStore } from 'src/stores/admin';
import { apiPutConfirmBid } from 'src/services/admin';

export const BidConfirmationDialog = ({ selectedBid }) => {
  const { selectedTask, getTaskById } = useTaskStore();

  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmBid = async () => {
    setIsLoading(true);
    try {
      await apiPutConfirmBid({ taskId: selectedTask?.id, bidId: selectedBid?.id });
      await getTaskById({ id: selectedTask?.id });
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleClickOpen} sx={{ width: '100%' }}>
        Accept
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle textAlign="center" variant="h5">
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="center" color="text.secondary" variant="body2">
            Are you sure you want to confirm{' '}
            <Typography color="primary" component="span">
              {selectedBid?.bidder?.name}&apos;s
            </Typography>{' '}
            bid for Task{' '}
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
            onClick={handleConfirmBid}
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

BidConfirmationDialog.propTypes = {
  selectedBid: PropTypes.object,
};
