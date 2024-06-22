import { useState, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import { Stack, Dialog, Button, Typography, FormHelperText } from '@mui/material';

import { useAuth } from 'src/context/authContext';
import { doSignOut, doResendVerificationEmail } from 'src/firebase/auth/auth';

import Iconify from 'src/components/iconify';

export const EmailUnverifiedDialog = () => {
  const { isEmailVerified, isLoggedIn } = useAuth();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResendEmail = async () => {
    setIsLoading(true);
    await doResendVerificationEmail();
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await doSignOut();
    window.location.href = '/';
  };

  useEffect(() => {
    if (isLoggedIn && !isEmailVerified) {
      setOpen(true);
    }
  }, [isEmailVerified, isLoggedIn]);

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="column"
        width="100%"
        py={8}
        spacing={6}
      >
        <Stack direction="column" width="100%" gap={2} justifyContent="center" alignItems="center">
          <Iconify icon="ic:twotone-info" width={50} />
          <Stack direction="column" alignItems="center">
            <Typography
              fontFamily="Wix Madefor Display"
              fontWeight={600}
              fontSize={20}
              textAlign="center"
            >
              Email verification pending
            </Typography>
            <FormHelperText sx={{ textAlign: 'center' }}>
              Verification link sent to your email address. Please verify to proceed.
            </FormHelperText>
            <FormHelperText sx={{ textAlign: 'center' }}>
              If you have not received the email, please click on resend
            </FormHelperText>
          </Stack>

          <Stack direction="column" gap={2}>
            <LoadingButton
              variant="contained"
              color="inherit"
              onClick={handleResendEmail}
              loading={isLoading}
            >
              Resend
            </LoadingButton>
            <Button onClick={() => window.location.reload()}>Already verified?</Button>

            <FormHelperText>
              Having trouble? Please try{' '}
              <Typography component="span" color="#1877F2" fontWeight={600} onClick={handleSignOut}>
                Sign in
              </Typography>{' '}
              again
            </FormHelperText>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};
