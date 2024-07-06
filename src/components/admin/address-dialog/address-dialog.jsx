import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import { LoadingButton } from '@mui/lab';
import { Box, Chip, Stack, Alert, Dialog, Button, TextField, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

const validationSchema = yup.object().shape({
  street: yup.string().required('*required'),
  apartment: yup.string(),
  city: yup.string().required('*required'),
  state: yup.string().required('*required'),
  zip: yup.string().required('*required'),
});

export const AddressDialog = ({ user, handleAddAddress, disabled }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({
    variant: '',
    content: '',
  });
  const isExistingAddress = Boolean(user?.address);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      street: user?.address?.street,
      apartment: user?.address?.apartment,
      city: user?.address?.city,
      state: user?.address?.state,
      zip: user?.address?.zip,
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await handleAddAddress(values);
        setShowAlert({ variant: 'success', content: 'Address added successfully!' });
        setIsLoading(false);
      } catch (err) {
        setShowAlert({ variant: 'error', content: 'Something went wrong!' });
        setIsLoading(false);
      }
    },
  });

  return (
    <Box>
      <Chip
        icon={<Iconify icon={isExistingAddress ? 'mdi:pencil-circle' : 'octicon:feed-plus-16'} />}
        label={`${isExistingAddress ? 'Edit / Confirm' : 'Add'} Address`}
        sx={{ minWidth: 140, fontFamily: 'Wix Madefor Display', fontWeight: 600 }}
        onClick={() => setOpen(true)}
        disabled={disabled}
      />

      <Dialog open={open} maxWidth="sm" fullWidth>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="column"
          width="100%"
          py={2}
          spacing={6}
        >
          <Stack
            direction="column"
            width="100%"
            gap={2}
            justifyContent="center"
            alignItems="center"
            p={2}
          >
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <Stack direction="column" alignItems="center" gap={2} width="100%">
                <Typography fontFamily="Wix Madefor Display" fontWeight={600} fontSize={20}>
                  {isExistingAddress ? 'Edit / Confirm Address' : 'Add New Address'}
                </Typography>

                {showAlert.content && (
                  <Alert
                    sx={{ width: '100%', fontFamily: 'Wix Madefor Display', fontWeight: 600 }}
                    severity={showAlert.variant}
                  >
                    {showAlert.content}
                  </Alert>
                )}

                <TextField
                  name="street"
                  label="Street address"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  error={formik.touched.street && Boolean(formik.errors.street)}
                  helperText={formik.touched.street && formik.errors.street}
                  fullWidth
                />

                <TextField
                  name="apartment"
                  label="Apartment, suite, unit, etc."
                  value={formik.values.apartment}
                  onChange={formik.handleChange}
                  error={formik.touched.apartment && Boolean(formik.errors.apartment)}
                  helperText={formik.touched.apartment && formik.errors.apartment}
                  fullWidth
                />

                <TextField
                  name="city"
                  label="Town / City"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                  fullWidth
                />

                <TextField
                  name="state"
                  label="State / Country"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                  fullWidth
                />

                <TextField
                  name="zip"
                  label="Postcode / Zip"
                  value={formik.values.zip}
                  onChange={formik.handleChange}
                  error={formik.touched.zip && Boolean(formik.errors.zip)}
                  helperText={formik.touched.zip && formik.errors.zip}
                  fullWidth
                />

                <Stack direction="row" justifyContent="flex-start" width="100%" gap={1}>
                  <Button variant="contained" color="error" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                  <LoadingButton
                    variant="contained"
                    color="inherit"
                    type="submit"
                    loading={isLoading}
                  >
                    {isExistingAddress ? 'Confirm' : 'Add'} Address
                  </LoadingButton>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Dialog>
    </Box>
  );
};

AddressDialog.propTypes = {
  user: PropTypes.object,
  handleAddAddress: PropTypes.func,
  disabled: PropTypes.bool,
};
