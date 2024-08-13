/* eslint-disable react-hooks/exhaustive-deps */
import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import { LoadingButton } from '@mui/lab';
import { Stack, Button, TextField } from '@mui/material';

import { apiPostSendEmail } from 'src/services/admin';
import { apiAddClientDoc } from 'src/firebase/firestore/admin';

const validationSchema = yup.object().shape({
  street: yup.string().required('*required'),
  apartment: yup.string(),
  city: yup.string().required('*required'),
  state: yup.string().required('*required'),
  zip: yup.string().required('*required'),
});

export const AddressDetails = ({ userDetails, setUserDetails, setTab, setShowAlert }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      street: userDetails.address?.street || '',
      apartment: userDetails.address?.apartment || '',
      city: userDetails.address?.city || '',
      state: userDetails.address?.state || '',
      zip: userDetails.address?.zip || '',
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await apiAddClientDoc({ ...userDetails, address: values });
        await apiPostSendEmail({
          email: userDetails.email,
          action: 'client-sign-up',
          context: { name: `${userDetails?.firstName} ${userDetails?.lastName}` },
        });
        setShowAlert({ variant: 'success', content: 'User added successfully!' });
      } catch (err) {
        setShowAlert({ variant: 'error', content: 'Something went wrong!' });
      }
      setTab(0);
      setIsLoading(false);
      setUserDetails({});
    },
  });

  return (
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
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setUserDetails({ ...userDetails, address: formik.values });
                setTab(0);
              }}
            >
              Back
            </Button>
            <LoadingButton variant="contained" color="inherit" type="submit" loading={isLoading}>
              Confirm
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

AddressDetails.propTypes = {
  userDetails: PropTypes.object,
  setUserDetails: PropTypes.func,
  setTab: PropTypes.func,
  setShowAlert: PropTypes.func,
};
