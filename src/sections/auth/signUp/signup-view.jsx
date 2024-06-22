/* eslint-disable import/no-extraneous-dependencies */
import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet-async';
import { RecaptchaVerifier } from 'firebase/auth';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { LoadingButton } from '@mui/lab';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Alert,
  Stack,
  Checkbox,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { bgGradient } from 'src/theme/css';
import { auth } from 'src/firebase/config';
import Logo from 'src/assets/images/favicon.png';
import HvacLogo from 'src/assets/images/hvac-logo.png';
import {
  doDeleteUser,
  doSignInWithPhoneNumber,
  doCreateUserWithEmailAndPassword,
} from 'src/firebase/auth/auth';

import Iconify from 'src/components/iconify';
import { OtpInput } from 'src/components/commons';

// ----------------------------------------------------------------------

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
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
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(6, `Password must be at least 6 characters long`)
    .matches(/^[a-zA-Z0-9]+$/, 'Password can only contain letters and numbers')
    .required('Password is required'),
});

export function SignUpView({ setNavigationTab }) {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState('');
  const [openOTPInput, setOpenOTPInput] = useState(false);
  const [otpVerficationLodaing, setOtpVerficationLodaing] = useState(false);
  const [isCompany, setIsCompany] = useState(false);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      companyWebsite: '',
    },
    onSubmit: async (values) => {
      try {
        const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
        const response = await doSignInWithPhoneNumber(values.phoneNumber, recaptcha);
        setOpenOTPInput(true);
        if (response) {
          window.otpConfirmationResponse = response;
        }
      } catch (err) {
        console.log(err.message);
        setShowAlert('Signup Failed! Please try again');
      }
    },
  });

  const handleOTPSubmit = async (tempOTP) => {
    setOtpVerficationLodaing(true);
    try {
      if (tempOTP) {
        const response = await window.otpConfirmationResponse.confirm(tempOTP);
        if (response) {
          // deleting user, created by OTP confirmation
          await doDeleteUser(response.user);

          const r = await doCreateUserWithEmailAndPassword(
            formik.values.email,
            formik.values.password,
            formik.values.firstName,
            formik.values.lastName,
            formik.values.phoneNumber,
            isCompany,
            formik.values.companyWebsite
          );

          if (r) {
            window.location.reload();
          }
        }
      }
    } catch (err) {
      console.log(err);
      setShowAlert('Signup Failed! Please try again');
    } finally {
      setOtpVerficationLodaing(false);
      setOpenOTPInput(false);
    }
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Helmet>
        <title> Sign Up </title>
      </Helmet>

      <Stack sx={{ position: 'absolute', top: { xs: 16, md: 24 }, left: { xs: 16, md: 24 } }}>
        <img src={Logo} alt="Hvac Logo" width={48} style={{ borderRadius: 50 }} />
      </Stack>

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Stack alignItems="center" justifyContent="center" my={2} mb={4}>
            <img src={HvacLogo} alt="Hvac Logo" width={180} style={{ marginLeft: '-20px' }} />
          </Stack>

          <Alert
            severity="error"
            sx={{
              fontFamily: 'Wix Madefor Display',
              fontWeight: 600,
              display: showAlert ? 'flex' : 'none',
              my: 1,
            }}
          >
            {showAlert}
          </Alert>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />

                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Stack>

              <TextField
                name="phoneNumber"
                label="Phone Number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />

              <TextField
                name="email"
                label="Email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
              />

              <Stack direction="row" alignItems="center">
                <Checkbox
                  checkedIcon={<Iconify icon="lets-icons:check-fill" />}
                  icon={<Iconify icon="ic:baseline-radio-button-unchecked" />}
                  onClick={() => setIsCompany(!isCompany)}
                />{' '}
                <Typography sx={{ fontFamily: 'Wix Madefor Display', color: '#6c757d' }}>
                  {' '}
                  Are you a company ?{' '}
                </Typography>
              </Stack>

              <TextField
                name="companyWebsite"
                label="Company Website"
                type="text"
                value={formik.values.companyWebsite}
                onChange={formik.handleChange}
                error={isCompany && !formik.values.companyWebsite}
                required={isCompany}
                sx={{ display: isCompany ? 'flex' : 'none' }}
              />
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              sx={{ mt: 2 }}
            >
              Sign Up
            </LoadingButton>
          </form>

          <OtpInput
            open={openOTPInput}
            phoneNumber={formik.values.phoneNumber}
            isLoading={otpVerficationLodaing}
            onSubmit={handleOTPSubmit}
          />

          <div id="recaptcha" style={{ marginTop: 8 }} />

          <Typography mt={2} textAlign="center">
            Already have an account?{' '}
            <Typography onClick={() => setNavigationTab(0)} component="span" color="#1877F2">
              Sign in
            </Typography>
          </Typography>
        </Card>
      </Stack>
    </Box>
  );
}

SignUpView.propTypes = {
  setNavigationTab: () => {},
};
