import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { LoadingButton } from '@mui/lab';
import { Alert, Stack, Dialog, Button, Divider, TextField, Typography } from '@mui/material';

import { apiPostInterestedClient } from 'src/services/client';

import Iconify from 'src/components/iconify';

const MAX_MESSAGE_LENGTH = 250;

const validationSchema = yup.object().shape({
  firstName: yup.string().required('*required'),
  lastName: yup.string().required('*required'),
  email: yup.string().email().required('*required'),
  phoneNumber: yup
    .string()
    .required('*required')
    .test('is-valid-phone', 'Invalid phone number', (value) => {
      const phoneUtil = PhoneNumberUtil.getInstance();
      try {
        const phoneNumber = phoneUtil.parseAndKeepRawInput(value);
        return phoneUtil.isValidNumber(phoneNumber);
      } catch (e) {
        return false;
      }
    }),
  message: yup
    .string()
    .required('*required')
    .max(MAX_MESSAGE_LENGTH, "Message can't be longer than 250 characters"),
});

export const ContactUsDialog = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({ variant: '', content: '' });

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
        const response = await apiPostInterestedClient({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          postalCode: values.postalCode,
          message: values.message,
        });

        setShowAlert({ variant: 'success', content: response.message });

        setTimeout(() => {
          setIsLoading(false);
          formik.resetForm();
          setOpen(false);
          setShowAlert({ variant: '', content: '' });
        }, 2000);
      } catch (err) {
        setIsLoading(false);
        setShowAlert({
          variant: 'error',
          content: 'Something went wrong. Please try again.',
        });
      }
    },
  });

  const handleClose = () => {
    setOpen(false);
    window.sessionStorage.setItem('contact-us', false);
  };

  const handleSessoinStorage = () => {
    if (!window.sessionStorage) return;

    const contactUsValue = window.sessionStorage.getItem('contact-us');

    if (contactUsValue === null) {
      window.sessionStorage.setItem('contact-us', true);
      setOpen(true);
    } else if (contactUsValue === 'true') {
      setOpen(true);
    } else if (contactUsValue === 'false') {
      setOpen(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleSessoinStorage();
    }, 3500);
  }, []);

  return (
    <>
      <Button
        variant="contained"
        sx={{
          maxWidth: 200,
          minHeight: 36,
          bgcolor: '#7AC142',
          color: '#ffffff',
          borderRadius: 0,
          fontSize: 20,
          fontWeight: 400,
          ':hover': {
            bgcolor: '#7AC142',
            color: '#ffffff',
          },
        }}
        onClick={() => setOpen(true)}
      >
        Give us a call
      </Button>

      <Dialog open={open} maxWidth="sm" fullWidth>
        <Stack justifyContent="center" alignItems="center" direction="column" width="100%" p={2}>
          <Stack
            direction="column"
            width="100%"
            gap={2}
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              direction="column"
              width="100%"
              justifyContent="center"
              alignItems="flex-start"
              gap={1}
            >
              <Typography variant="h5">Give us a call</Typography>
              <Stack direction="row" alignItems="center" gap={1}>
                <Iconify icon="solar:phone-bold" />
                <Typography variant="body2">+1 (425) 653-1717</Typography>
              </Stack>

              <Divider sx={{ width: '100%' }} />

              <Typography variant="h5">Or let us contact you!</Typography>
            </Stack>

            {showAlert.content && (
              <Alert
                sx={{ width: '100%', fontFamily: 'Wix Madefor Display', fontWeight: 600 }}
                severity={showAlert.variant}
              >
                {showAlert.content}
              </Alert>
            )}

            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <Stack direction="column" alignItems="center" gap={1} width="100%">
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

                <Stack direction="column" alignItems="flex-end" width="100%">
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
                  <Typography color="text.secondary" variant="body2" mt={0}>
                    {formik.values.message.length} / {MAX_MESSAGE_LENGTH}
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="flex-start" width="100%" gap={1}>
                  <Button variant="contained" color="error" onClick={() => handleClose()}>
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
    </>
  );
};
