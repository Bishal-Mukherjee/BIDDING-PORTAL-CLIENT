import React from 'react';
import PropTypes from 'prop-types';

import { Box, Stack, Drawer, Typography, IconButton } from '@mui/material';

import usserProfileImageSvg from 'src/assets/svgs/user.svg';

import Iconify from 'src/components/iconify';

export const ClientDetailsDialog = ({ open, setOpen, clientDetails }) => {
  const name = `${clientDetails?.firstName} ${clientDetails?.lastName}` || '';
  const email = clientDetails?.email || '';
  const phoneNumber = clientDetails?.phoneNumber || '';
  const address = clientDetails?.address || {};

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <Box sx={{ minWidth: { lg: 400, sm: 360, xs: 360 }, m: 1, height: '100%', maxWidth: 408 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2}>
          <Typography variant="h4" fontFamily="Poppins">
            Client Details
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Iconify icon="mdi:close" />
          </IconButton>
        </Stack>

        <Stack mt={1} p={1} direction="column">
          <img
            src={usserProfileImageSvg}
            alt={name}
            style={{ width: 400, height: 180, backgroundColor: '#e9ecef', borderRadius: 12 }}
          />

          <Typography variant="h5" mt={2}>
            {name}
          </Typography>

          <Stack direction="row" justifyContent="flex-start" alignItems="center" gap={1}>
            <Iconify icon="mdi:email" />
            <Typography variant="subtitle2" color="#6c757d">
              {email}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="flex-start" alignItems="center" gap={1}>
            <Iconify icon="mdi:phone" />
            <Typography variant="subtitle2" color="#6c757d">
              {phoneNumber}
            </Typography>
          </Stack>

          <Stack direction="column" gap={0} mt={2}>
            <Typography variant="subtitle2" color="#6c757d">
              Apartment: {address?.apartment}
            </Typography>
            <Typography variant="subtitle2" color="#6c757d">
              Street: {address?.street}
            </Typography>
            <Typography variant="subtitle2" color="#6c757d">
              City: {address?.city}
            </Typography>
            <Typography variant="subtitle2" color="#6c757d">
              Pin: {address?.zip}
            </Typography>
            <Typography variant="subtitle2" color="#6c757d">
              State: {address?.state}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};

ClientDetailsDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  clientDetails: PropTypes.object,
};
