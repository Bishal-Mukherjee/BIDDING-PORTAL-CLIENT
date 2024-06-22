import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Stack,
  Alert,
  Dialog,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { apiPostCreateClient } from 'src/services/admin';
import { apiAddClientDoc } from 'src/firebase/firestore/admin';

import Iconify from 'src/components/iconify';

const validationSchema = yup.object().shape({
  firstName: yup.string().required('*required'),
  lastName: yup.string(),
  email: yup.string().email().required('Email is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .test('is-valid-phone', 'Invalid phone number', (value) => {
      const phoneUtil = PhoneNumberUtil.getInstance();
      try {
        const phoneNumber = phoneUtil.parseAndKeepRawInput(value);
        return phoneUtil.isValidNumber(phoneNumber);
      } catch (e) {
        return false;
      }
    }),
  password: yup
    .string()
    .min(6, `Password must be at least 6 characters long`)
    .matches(/^[a-zA-Z0-9]+$/, 'Password can only contain letters and numbers')
    .required('Password is required'),
});

export const AddClientDialog = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState({
    variant: '',
    content: '',
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await apiPostCreateClient({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          phoneNumber: values.phoneNumber,
        });
        await apiAddClientDoc({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
        });
        setShowAlert({ variant: 'success', content: 'Client added successfully!' });
        setIsLoading(false);
        formik.resetForm();
      } catch (err) {
        setShowAlert({ variant: 'error', content: 'Something went wrong!' });
        setIsLoading(false);
      }
    },
  });

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => setOpen(true)}
        startIcon={<Iconify icon="icons8:plus" />}
      >
        Add Client
      </Button>

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
                  Add New Client
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

                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
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
                    Add Client
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
