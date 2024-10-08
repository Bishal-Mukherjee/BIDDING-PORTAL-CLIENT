import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { LoadingButton } from '@mui/lab';
import { Stack, Alert, Button, TextField, Typography, InputAdornment } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { apiGetClient } from 'src/firebase/firestore/admin';

const validationSchema = yup.object().shape({
  firstName: yup.string().required('*required'),
  lastName: yup.string(),
  email: yup.string().email().required('*required'),
  phoneNumber: yup
    .string()
    .required('*required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits')
    .test('is-valid-us-phone', 'Invalid phone number', (value) => {
      try {
        const util = PhoneNumberUtil.getInstance();
        const number = util.parse(`+1${value}`, 'US');
        return util.isValidNumber(number);
      } catch (e) {
        return false;
      }
    }),
});

export const PersonalDetails = ({ setTab, setOpen, userDetails, setUserDetails }) => {
  const router = useRouter();

  const [showAlert, setShowAlert] = useState({
    variant: '',
    content: '',
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      firstName: userDetails.firstName || '',
      lastName: userDetails.lastName || '',
      email: userDetails.email || '',
      phoneNumber: userDetails.phoneNumber || '',
    },
    onSubmit: async (values) => {
      try {
        const isExistingClient = await apiGetClient({ phoneNumber: `+1${values.phoneNumber}` });
        if (isExistingClient) {
          setShowAlert({ variant: 'error', content: 'Client already exists' });
          return;
        }
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          phoneNumber: `+1${prevDetails.phoneNumber}`,
          ...values,
        }));
        setTab(1);
      } catch (err) {
        if (err.message === 'User not found') {
          setUserDetails((prevDetails) => ({
            ...prevDetails,
            phoneNumber: `+1${prevDetails.phoneNumber}`,
            ...values,
          }));
          setTab(1);
          return;
        }
        setShowAlert({ variant: 'error', content: 'Something went wrong!' });
      }
    },
  });

  const onClose = () => {
    setUserDetails({});
    setOpen(false);
    router.push('/admin/clients');
  };

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
          {showAlert.content && (
            <Alert
              sx={{ width: '100%', fontFamily: 'Wix Madefor Display', fontWeight: 600 }}
              severity={showAlert.variant}
            >
              {showAlert.content}
            </Alert>
          )}

          <TextField
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            fullWidth
          />

          <TextField
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            fullWidth
          />

          <TextField
            name="phoneNumber"
            label="Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography sx={{ mr: 1 }} color="text.secondary" variant="body1">
                    +1
                  </Typography>
                </InputAdornment>
              ),
            }}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            fullWidth
          />

          <TextField
            name="email"
            label="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
          />

          <Stack direction="row" justifyContent="flex-start" width="100%" gap={1}>
            <Button variant="contained" color="error" onClick={onClose}>
              Close
            </Button>
            <LoadingButton variant="contained" color="inherit" type="submit">
              Next
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

PersonalDetails.propTypes = {
  setTab: PropTypes.func,
  setOpen: PropTypes.func,
  userDetails: PropTypes.object,
  setUserDetails: PropTypes.func,
};
