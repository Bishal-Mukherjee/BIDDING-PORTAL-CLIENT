import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Grid,
  Stack,
  Button,
  styled,
  Typography,
  Container as MuiContainer,
} from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import HvacLogo from 'src/assets/images/hvac-logo.png';

import Iconify from 'src/components/iconify';

const Container = styled(MuiContainer)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
}));

const Header = () => {
  const isMd = useResponsive('up', 'md');
  const navigate = useNavigate();
  return (
    <Box width="100%" bgcolor="#ffffff">
      <Container maxWidth="lg">
        <Grid
          container
          alignItems="center"
          justifyItems="space-between"
          width="100%"
          height="100%"
          flexWrap={{ xs: 'wrap', md: 'nowrap' }}
          py={3}
          gap={2}
          maxWidth="lg"
          minHeight={148}
        >
          <Grid
            item
            md={4}
            xs={12}
            sm={12}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Stack
              width="100%"
              direction={{ xs: 'row', md: 'column' }}
              alignItems={{ xs: 'center', md: 'flex-start' }}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              spacing={{ md: 0, sm: 0, xs: 3 }}
            >
              <Stack direction="row" spacing={1.4} alignItems="center">
                <Iconify icon="ic:sharp-phone" color="#7AC142" />
                <Typography
                  variant="subtitle1"
                  color="#5F676E"
                  fontWeight={700}
                  sx={{
                    cursor: 'pointer',
                    ':hover': { color: '#022a5c' },
                    fontSize: { md: 16, xs: 12 },
                  }}
                >
                  +1 (425) 653-1717
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.4} alignItems="center">
                <Iconify icon="material-symbols:mail" color="#7AC142" />
                <Typography
                  variant="subtitle1"
                  color="#5F676E"
                  fontWeight={700}
                  sx={{
                    cursor: 'pointer',
                    ':hover': { color: '#022a5c' },
                    fontSize: { md: 16, xs: 12 },
                  }}
                >
                  info@hvacnegotiators.com
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid
            item
            md={4}
            ms={12}
            xs={12}
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img src={HvacLogo} alt="Hvac Logo" width={isMd ? 252 : 208} />
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
            display="flex"
            justifyContent={{ md: 'flex-end', sm: 'center', xs: 'center' }}
            alignItems="center"
          >
            <Button
              sx={{
                minWidth: 200,
                minHeight: 40,
                bgcolor: '#7AC142',
                color: '#ffffff',
                borderRadius: 0,
                ':hover': {
                  bgcolor: '#7AC142',
                  color: '#ffffff',
                },
              }}
              onClick={() => navigate('/')}
            >
              <Typography fontSize={18}>LOGIN</Typography>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
