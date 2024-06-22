import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Stack, Dialog, TextField, Typography } from '@mui/material';

export const OtpInput = ({ open, phoneNumber, isLoading, onSubmit }) => {
  const numberOfDigits = 6;
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    const { value } = e.target;
    const newOtp = [...otp];

    if (value.length < otp[index].length && index > 0) {
      newOtp[index] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    } else {
      if (!/^\d$/.test(value) && value !== '') return;
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < numberOfDigits - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const assignRef = (index, ref) => {
    inputRefs.current[index] = ref;
  };

  const isOtpComplete = otp.join('').length === numberOfDigits;

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
        <Stack direction="column" width="100%" gap={1} justifyContent="center" alignItems="center">
          <Typography fontFamily="Wix Madefor Display" fontWeight={600} fontSize={20}>
            OTP Verification
          </Typography>
          <Typography fontFamily="Wix Madefor Display">
            Enter OTP sent to{' '}
            <Typography fontWeight="bold" component="span">
              {phoneNumber}
            </Typography>
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={{ md: 2, xs: 1, sm: 1 }}
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(ref) => assignRef(index, ref)}
              value={digit}
              inputProps={{
                maxLength: 1,
                inputMode: 'numeric',
                pattern: '[0-9]*',
                style: { textAlign: 'center' },
              }}
              onChange={(e) => handleInput(e, index)}
              onKeyDown={(e) =>
                e.key === 'Backspace' && !otp[index] && inputRefs.current[index - 1].focus()
              }
              variant="standard"
              sx={{ width: 40, height: '100%' }}
            />
          ))}
        </Stack>

        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          loading={isLoading}
          disabled={isLoading || !isOtpComplete}
          onClick={() => onSubmit(otp.join(''))}
        >
          Verify
        </LoadingButton>
      </Stack>
    </Dialog>
  );
};

OtpInput.propTypes = {
  phoneNumber: PropTypes.string,
  open: PropTypes.bool,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
};
