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

import { apiDeleteClient } from 'src/firebase/firestore/admin';
import { apiDeleteUserRelatedTasks } from 'src/services/admin';

export const ConfirmClientDeletion = ({ open, setOpen, selectedClient }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClient = async () => {
    setIsLoading(true);
    await apiDeleteClient({ email: selectedClient.email });
    await apiDeleteUserRelatedTasks({ email: selectedClient.email });
    setIsLoading(false);
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle textAlign="center" variant="h5">
        Are you sure?
      </DialogTitle>
      <DialogContent>
        <DialogContentText textAlign="center" color="text.secondary" variant="body2">
          Are you sure you want to remove{' '}
          <Typography color="primary" component="span">
            {selectedClient?.firstName} {selectedClient?.lastName}&nbsp;?
          </Typography>{' '}
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
          onClick={handleDeleteClient}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

ConfirmClientDeletion.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  selectedClient: PropTypes.object,
};
