import React from 'react';
import PropTypes from 'prop-types';

import { Box, Grid, Stack, Typography } from '@mui/material';

import HvacLogo from 'src/assets/images/hvac-logo.png';

import Iconify from 'src/components/iconify';

const ContactListItem = ({ icon, text }) => (
  <Stack direction="row" alignItems="center" gap={1}>
    <Iconify icon={icon} width={24} color="#7AC142" />
    <Typography variant="body2" color="white">
      {text}
    </Typography>
  </Stack>
);

export const Footer = () => (
  <Grid
    container
    justifyContent={{ md: 'center', xs: 'center' }}
    alignItems="center"
    gap={4}
    sx={{ bgcolor: '#04192a', minHeight: 240, py: 2 }}
  >
    <Grid item md={4}>
      <Stack
        width="100%"
        height="100%"
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        gap={2}
      >
        <img src={HvacLogo} alt="Hvac Logo" width={208} />

        <Box sx={{ maxWidth: { md: 360, xs: '100%' } }}>
          <Typography variant="body1" color="white" textAlign="center">
            Bringing comfort to your space through expert Heating, Ventilation, and Air Conditioning
            solutions.
          </Typography>
        </Box>
      </Stack>
    </Grid>

    <Grid item md={4}>
      <Stack
        direction={{ md: 'row', sm: 'column' }}
        alignItems="flex-start"
        justifyContent="flex-start"
        gap={4}
      >
        <Stack gap={2} direction="column">
          <Typography variant="subtitle1" color="#ffffff">
            Contact Info:
          </Typography>
          <ContactListItem icon="mdi:location" text="3409 McDougall Avenue" />
          <ContactListItem icon="ant-design:phone-filled" text="(425) 653-1717" />
          <ContactListItem icon="material-symbols:mail" text="info@hvacnegotiators.com" />
        </Stack>

        <Stack gap={1} direction="column">
          <Typography variant="subtitle1" color="#ffffff">
            Open Hours:
          </Typography>
          <ContactListItem icon="wi:time-5" text="Mon - Sat: 8 am - 8 pm" />
          <ContactListItem icon="wi:time-5" text="Sunday: Closed" />
        </Stack>
      </Stack>
    </Grid>
  </Grid>
);

ContactListItem.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
