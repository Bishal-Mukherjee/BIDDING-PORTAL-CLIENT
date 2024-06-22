/* eslint-disable import/no-extraneous-dependencies */
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { LoadingButton } from '@mui/lab';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  Link,
  Card,
  Stack,
  Alert,
  Button,
  Divider,
  Checkbox,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import Logo from 'src/assets/images/favicon.png';
import { useAuth } from 'src/context/authContext';
import HvacLogo from 'src/assets/images/hvac-logo.png';
import { doSignInWithGoogle, doSignInWithEmailAndPassword } from 'src/firebase/auth/auth';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup
    .string()
    .min(6, `Password must be at least 6 characters long`)
    .matches(/^[a-zA-Z0-9]+$/, 'Password can only contain letters and numbers')
    .required('Password is required'),
});

export function SignInView({ setNavigationTab }) {
  const theme = useTheme();

  const { user } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState('');

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await doSignInWithEmailAndPassword(values.email, values.password);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setShowAlert('Invalid email or password');
        setIsLoading(false);
      }
    },
  });

  const handleGoogleSignIn = async () => {
    const response = await doSignInWithGoogle();
    if (response === 'email-verification-pending')
      setShowAlert('Please verify your email to use Google Auth');
    if (!response) setShowAlert('No account found. Are you new here? Please Sign Up');
  };

  useEffect(() => {
    if (!isEmpty(user)) {
      const designation = String(user?.designation).toLowerCase();
      router.push(`/${designation}/analytics`);
    }
  }, [user, router]);

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
        <title> Sign In </title>
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
          <Stack alignItems="center" justifyContent="center" my={2}>
            <img src={HvacLogo} alt="Hvac Logo" width={180} style={{ marginLeft: '-20px' }} />
          </Stack>

          <Alert
            severity="error"
            sx={{
              fontFamily: 'Wix Madefor Display',
              fontWeight: 600,
              display: showAlert ? 'flex' : 'none',
            }}
          >
            {showAlert}
          </Alert>

          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16), mt: 2 }}
            onClick={handleGoogleSignIn}
          >
            <Iconify icon="flat-color-icons:google" />
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
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
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <Stack alignItems="center" direction="row">
                <Checkbox />
                <Typography variant="subtitle2">Remember Me?</Typography>
              </Stack>
              <Link variant="subtitle2" underline="hover">
                Forgot password?
              </Link>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              loading={isLoading}
            >
              Sign In
            </LoadingButton>
          </form>

          <Typography mt={2} textAlign="center" variant="body2">
            Don&apos;t have an account?{' '}
            <Typography onClick={() => setNavigationTab(1)} component="span" color="#1877F2">
              Sign up
            </Typography>
          </Typography>
        </Card>
      </Stack>
    </Box>
  );
}

SignInView.propTypes = {
  setNavigationTab: PropTypes.func,
};
