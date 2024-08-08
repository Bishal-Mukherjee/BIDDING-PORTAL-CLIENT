/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Grid, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import HOME_BG from 'src/assets/images/home-bg.jpg';
import HANDSHAKE_BG from 'src/assets/images/handshake.png';
import HOME_LAPTOP_BG from 'src/assets/images/home-laptop-bg.jpg';

import Iconify from 'src/components/iconify';
import { SquareBox } from 'src/components/commons';

import { ContactUsDialog } from './contact-us-dialog';

const BG_OVERLAY =
  'linear-gradient(to right, rgba(0, 20, 30, 0.96) 10%, rgba(0, 20, 30, 0.90) 20%, rgba(255, 0, 0, 0))';

const EntityCard = ({ icon, label }) => (
  <Stack
    direction="column"
    alignItems="center"
    gap={1}
    justifyContent="center"
    minHeight={184}
    minWidth={{ xs: 150, md: 200 }}
    bgcolor="#7AC142"
    position="relative"
  >
    {icon}
    <Box
      width="100%"
      bgcolor="#022a5c"
      p={1}
      position="absolute"
      bottom={0}
      textAlign="center"
      component={Link}
      to="/auth"
      sx={{ textDecoration: 'none' }}
    >
      <Typography color="#ffffff" variant="body1">
        {label}
      </Typography>
    </Box>
  </Stack>
);

const HomeBanner = () => {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');
  const titleFontSize = theme.breakpoints.up('lg') ? 50 : theme.breakpoints.up('md') ? 40 : 30;
  const subTitleFontSize = theme.breakpoints.up('lg') ? 14 : 12;

  const entityCards = [
    {
      icon: <Iconify icon="fa6-solid:handshake" width={48} color="#ffffff" />,
      label: 'PARTNER',
    },
    {
      icon: <Iconify icon="clarity:administrator-solid" width={48} color="#ffffff" />,
      label: 'ADMIN',
    },
  ];

  return (
    <>
      <Box
        sx={{
          height: '74vh',
          backgroundImage: `url(${HOME_LAPTOP_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box sx={{ height: '100%', backgroundImage: BG_OVERLAY }}>
          <Container maxWidth="lg" sx={{ py: '8%' }}>
            <Stack
              direction="row"
              width="100%"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={2}
            >
              <Typography
                color="#FFFFFF"
                fontWeight={900}
                fontSize={titleFontSize}
                textAlign="center"
              >
                <span style={{ fontWeight: 400 }}>We Bring </span>
                <br /> <span style={{ fontWeight: 400 }}>the clients</span> <br /> TO YOU
              </Typography>

              <Typography
                color="#FFFFFF"
                fontWeight={700}
                fontSize={titleFontSize}
                textAlign="right"
                letterSpacing={-4}
              >
                A NEW ERA OF <br /> HVAC SYSTEM <br /> SELECTION
              </Typography>
            </Stack>
          </Container>
        </Box>
      </Box>

      <Stack direction="row" justifyContent="center" alignItems="center" gap={4} my={4}>
        {entityCards.map((entityCard, index) => (
          <EntityCard
            key={`entity-card-${index}`}
            icon={entityCard.icon}
            label={entityCard.label}
          />
        ))}
      </Stack>

      <Grid container sx={{ mb: 8 }} justifyContent="center" height="48vh" flexWrap="wrap">
        <Grid item xs={12} md={6}>
          <Stack height="100%" gap={2} bgcolor="#022a5c" p={4}>
            <Typography fontWeight={700} fontSize={20} color="#ffffff">
              PARTNERSHIP
            </Typography>
            <Typography color="#ffffff" variant="subtitle1">
              Partner with HVAC Negotiators and redefine your approach to winning bids. Elevate your
              business by accessing exclusive customer insights and competing stragically in a
              focused marketplace.
            </Typography>

            <Button
              variant="contained"
              sx={{
                bgcolor: 'white',
                color: '#022a5c',
                mt: 'auto',
                width: 'fit-content',
                ':hover': { bgcolor: 'white', color: '#022a5c' },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={0} md={4}>
          <Box
            sx={{
              backgroundImage: `url(${HANDSHAKE_BG})`,
              height: '100%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </Grid>
      </Grid>

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
          <Container maxWidth="lg" sx={{ py: '6%' }}>
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
                  forward steps - a process designed to save you time, provide clarity, and ensure
                  you get the best deal for your needs.
                </Typography>
              </Stack>
              <ContactUsDialog />
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default HomeBanner;
