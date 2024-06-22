import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Box, Stack, Paper, Typography, OutlinedInput, InputAdornment } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

export const Reports = () => (
  <Stack direction="column" width="100%" gap={2}>
    <Helmet>
      <title> Admin | Reports </title>
    </Helmet>

    <Stack direction="row" px={16} width="100%" height={108} bgcolor="#F9F6EF" alignItems="center">
      <Typography variant="h3" fontFamily="Poppins">
        Reports
      </Typography>
    </Stack>

    <Stack direction="column" px={16} width="100%" mt={2}>
      <Box component={Paper} elevation={5}>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="material-symbols:search" />
            </InputAdornment>
          }
          placeholder="Search reports"
          fullWidth
        />
      </Box>
    </Stack>
  </Stack>
);
