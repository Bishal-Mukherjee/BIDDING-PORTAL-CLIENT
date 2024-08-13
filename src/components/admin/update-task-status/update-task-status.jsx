import * as React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

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

import { StatusLabel } from 'src/constants';

export const UpdateTaskStatus = ({
  open,
  onClose,
  requiredStatus = 'completed',
  onConfirmation,
  isLoading,
}) => {
  const params = useParams();
  return (
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
          as <b>{StatusLabel[requiredStatus]}</b> ?
          <Typography>This action cannot be undone. </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={onClose} color="warning">
          Close
        </Button>
        <LoadingButton
          color="inherit"
          variant="contained"
          loading={isLoading}
          onClick={onConfirmation}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

UpdateTaskStatus.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  requiredStatus: PropTypes.string.isRequired,
  onConfirmation: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
