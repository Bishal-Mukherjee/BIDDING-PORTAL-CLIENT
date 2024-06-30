import * as yup from 'yup';
import { useFormik } from 'formik';
import React, { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Stack,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import { useTaskStore } from 'src/stores/company';
import { apiPostCreateBid } from 'src/services/company';

import Iconify from 'src/components/iconify/iconify';

const validationSchema = yup.object().shape({
  amount: yup.number().typeError('Must be a number').required('Required'),
});

export const PlaceBidDialog = () => {
  const { selectedTask, getTaskById } = useTaskStore();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      amount: 0,
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      await apiPostCreateBid({
        taskId: selectedTask?.task?.id,
        amount: values.amount,
      });
      setIsLoading(false);
      getTaskById({ id: selectedTask?.task?.id });
      setOpen(false);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ bgcolor: '#022a5c' }}
        onClick={handleClickOpen}
        startIcon={<Iconify icon="pepicons-pencil:raise-hand-circle-filled" />}
      >
        Place Bid
      </Button>

      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography sx={{ fontSize: 20, fontWeight: 700 }}>Place a bid</Typography>
        </DialogTitle>
        <DialogContent>
          <Stack mt={2} width="100%">
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="Enter bid amount"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
              <Stack direction="row" alignItems="center" justifyContent="flex-end" mt={2}>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton type="submit" loading={isLoading}>
                  Confirm
                </LoadingButton>
              </Stack>
            </form>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
