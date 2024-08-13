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

export const ConfirmDeletion = ({ open, onClose, selectedEntity, onDelete, isLoading }) => (
  <Dialog open={open} maxWidth="sm" fullWidth>
    <DialogTitle textAlign="center" variant="h5">
      Are you sure?
    </DialogTitle>
    <DialogContent>
      <DialogContentText textAlign="center" color="text.secondary" variant="body2">
        Are you sure you want to remove{' '}
        <Typography color="primary" component="span">
          {selectedEntity?.firstName} {selectedEntity?.lastName}&nbsp;?
        </Typography>{' '}
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={onClose} color="warning">
        Close
      </Button>
      <LoadingButton color="inherit" variant="contained" loading={isLoading} onClick={onDelete}>
        Confirm
      </LoadingButton>
    </DialogActions>
  </Dialog>
);

ConfirmDeletion.propTypes = {
  open: PropTypes.bool,
  selectedEntity: PropTypes.object,
  onDelete: PropTypes.func,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func,
};
