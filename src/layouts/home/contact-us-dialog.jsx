import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Dialog, Button, TextField, Typography } from '@mui/material';

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
});

export const ContactUsDialog = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      postalCode: '',
      message: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        setTimeout(() => {
          setIsLoading(false);
          formik.resetForm();
          setOpen(false);
        }, 2000);
      } catch (err) {
        setIsLoading(false);
      }
    },
  });

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ background: '#7AC142', minWidth: 120 }}
        onClick={() => setOpen(true)}
      >
        Give us a call
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
                <Typography variant="h5">Let us contact you</Typography>

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
                  name="postalCode"
                  label="Postal Code"
                  value={formik.values.postalCode}
                  onChange={formik.handleChange}
                  error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                  helperText={formik.touched.postalCode && formik.errors.postalCode}
                  fullWidth
                />

                <TextField
                  name="message"
                  placeholder="How can we help you?"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  error={formik.touched.message && Boolean(formik.errors.message)}
                  helperText={formik.touched.message && formik.errors.message}
                  rows={3}
                  fullWidth
                  multiline
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
                    Send
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
