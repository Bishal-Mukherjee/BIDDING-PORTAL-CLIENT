/* eslint-disable no-nested-ternary */
import React from 'react';

import { Box, Stack, useTheme, Container, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import HOME_BG from 'src/assets/images/home-bg.jpg';

import { SquareBox } from 'src/components/commons';

const BG_OVERLAY =
  'linear-gradient(to right, rgba(0, 20, 30, 0.96) 10%, rgba(0, 20, 30, 0.90) 20%, rgba(255, 0, 0, 0))';

const HomeBanner = () => {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');
  const titleFontSize = theme.breakpoints.up('lg') ? 50 : theme.breakpoints.up('md') ? 40 : 30;
  const subTitleFontSize = theme.breakpoints.up('lg') ? 14 : 12;

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url(${HOME_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box sx={{ height: '100%', backgroundImage: BG_OVERLAY }}>
        <Container maxWidth="lg" sx={{ py: '12%' }}>
          <Stack direction="column" gap={4} width={{ xs: '100%', md: '50%' }}>
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
              <Typography
                color="#FFFFFFD6"
                lineHeight={1.6}
                variant="subtitle1"
                textAlign="justify"
              >
                At HVAC Negotiators, we believe in simplicity and efficiency. That&lsquo;s why;
                we&lsquo;ve streamlined the entire HVAC buying experience into three straight
                forward steps - a process designed to save you time, provide clarity, and ensure you
                get the best deal for your needs.
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomeBanner;
