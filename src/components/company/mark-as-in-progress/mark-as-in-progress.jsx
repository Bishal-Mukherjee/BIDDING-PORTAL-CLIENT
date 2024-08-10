import * as React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import { apiUpdateTaskStatus } from 'src/services/company';

export const MarkAsInProgressDialog = ({ open, setOpen }) => {
  const params = useParams();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleMarkAsInProgress = async () => {
    setIsLoading(true);
    try {
      await apiUpdateTaskStatus({ id: params?.taskId, status: 'in-progress' });
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle textAlign="center" variant="h5">
        Mark as &apos;In Progress&apos;
      </DialogTitle>
      <DialogContent>
        <DialogContentText textAlign="center" color="text.secondary" variant="body2">
          As task{' '}
          <Typography color="primary" component="span">
            #{params?.taskId}
          </Typography>{' '}
          is assigned to you, please mark it as &apos;In Progress&apos;
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <LoadingButton
          color="inherit"
          variant="contained"
          loading={isLoading}
          onClick={handleMarkAsInProgress}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

MarkAsInProgressDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
