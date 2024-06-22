import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Box, Paper, Stack, Button, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import HvacLogo from 'src/assets/images/hvac-logo.png';
import HomeBackground from 'src/assets/images/home-bg.jpg';

export const Home = () => {
  const router = useRouter();

  return (
    <>
      <Helmet>
        <title> HVAC Negotiators </title>
      </Helmet>

      <Box
        style={{
          backgroundImage: `url(${HomeBackground})`,
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            maxWidth={420}
            height={480}
            component={Paper}
            spacing={4}
            p={4}
            sx={{ opacity: 0.9, backdropFilter: 'blur(10px)' }}
          >
            <img src={HvacLogo} alt="Hvac Logo" width={168} style={{ marginLeft: -12 }} />
            <Typography textAlign="center" fontFamily="Poppins" lineHeight={1.6}>
              At HVAC Negotiators, we believe in simplicity and efficiency. That&apos;s why
              we&apos;ve streamlined the entire HVAC buying experience into three straightforward
              steps - a process designed to save you time, provide clarity, and ensure you get the
              best deal for your needs.
            </Typography>
            <Button onClick={() => router.push('/auth')}> Let&apos;s Get Started </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Home;
