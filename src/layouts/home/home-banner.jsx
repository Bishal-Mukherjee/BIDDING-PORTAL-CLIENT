/* eslint-disable no-nested-ternary */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import HOME_BG from 'src/assets/images/home-bg.jpg';

import Iconify from 'src/components/iconify';

const BG_OVERLAY =
  'linear-gradient(to right, rgba(0, 20, 30, 0.96) 10%, rgba(0, 20, 34, 0.88) 20%, rgba(0, 20, 44, 0.84) 44%, rgba(255, 0, 0, 0))';

const SquareBox = () => <Box width={12} height={12} bgcolor="#7AC142" />;

export const HomeBanner = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const mdUp = useResponsive('up', 'md');
  const titleFontSize = theme.breakpoints.up('lg') ? 50 : theme.breakpoints.up('md') ? 40 : 30;
  const subTitleFontSize = theme.breakpoints.up('lg') ? 14 : 12;

  return (
    <Box
      sx={{
        height: mdUp ? '100vh' : '116vh',
        backgroundImage: `url(${HOME_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container
        sx={{
          height: mdUp ? '100vh' : '116vh',
          backgroundImage: BG_OVERLAY,
          position: 'absolute',
        }}
        maxWidth="lg"
      >
        <Stack
          my={16}
          pl={mdUp ? 20 : 0}
          direction="column"
          gap={4}
          width={{ xs: '100%', md: '60%' }}
        >
          <Stack
            direction="row"
            gap={4}
            alignItems="center"
            justifyContent={mdUp ? 'left' : 'center'}
          >
            <Stack direction="row" gap={2} alignItems="center">
              <SquareBox />
              <Typography color="#FFFFFF" fontWeight={700} fontSize={subTitleFontSize}>
                PROFESSIONAL
              </Typography>
            </Stack>
            <Stack direction="row" gap={2} alignItems="center">
              <SquareBox />
              <Typography color="#FFFFFF" fontWeight={700} fontSize={subTitleFontSize}>
                TRUSTWORTHY
              </Typography>
            </Stack>
          </Stack>

          <Typography
            fontSize={titleFontSize}
            textAlign={mdUp ? 'left' : 'center'}
            color="#FFFFFF"
            fontWeight={800}
            lineHeight={{ xs: 1.2, md: 1.4 }}
          >
            Welcome to a new era of HVAC system selection
          </Typography>

          <Stack
            direction="row"
            minHeight="100%"
            alignItems="flex-start"
            gap={2}
            borderLeft={4}
            borderColor="#7AC142"
            pl={2}
          >
            <Typography color="#FFFFFFD6" lineHeight={1.6} variant="subtitle1">
              At HVAC Negotiators, we believe in simplicity and efficiency. That&lsquo;s why;
              we&lsquo;ve streamlined the entire HVAC buying experience into three straight forward
              steps - a process designed to save you time, provide clarity, and ensure you get the
              best deal for your needs.
            </Typography>
          </Stack>

          <Stack
            mt={2}
            direction="row"
            alignItems="center"
            gap={2}
            flexWrap={{ xs: 'wrap', md: 'nowrap' }}
          >
            <Button
              sx={{
                minHeight: 48,
                bgcolor: '#7AC142',
                color: '#ffffff',
                borderRadius: 0,
                ':hover': {
                  bgcolor: '#7AC142',
                  color: '#ffffff',
                },
                width: mdUp ? '50%' : '100%',
              }}
              onClick={() => navigate('/auth')}
            >
              <Typography fontSize={18}>GET STARTED</Typography>
            </Button>

            <Stack
              direction="row"
              spacing={1.4}
              alignItems="center"
              justifyContent="center"
              sx={{ width: mdUp ? '50%' : '100%' }}
            >
              <Iconify icon="ant-design:phone-filled" color="#7AC142" />
              <Typography
                variant="subtitle1"
                color="#FFFFFF"
                fontWeight={700}
                sx={{
                  cursor: 'pointer',
                  ':hover': { color: '#FFFFFF' },
                  fontSize: { md: 20, xs: 16 },
                }}
              >
                (425) 653-1717
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
