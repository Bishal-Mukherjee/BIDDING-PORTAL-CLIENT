/* eslint-disable import/no-extraneous-dependencies */

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import {
  Box,
  Grid,
  Card,
  Stack,
  Button,
  Divider,
  Container,
  CardMedia,
  Typography,
  CardContent,
} from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import ServiceCardA from 'src/assets/images/services/service-card-a.jpg';
import ServiceCardB from 'src/assets/images/services/service-card-b.jpg';
import ServiceCardC from 'src/assets/images/services/service-card-c.jpg';

import Iconify from 'src/components/iconify';
import { SquareBox } from 'src/components/commons';

const serviceCardData = [
  {
    img: ServiceCardA,
    title: 'Comparison of Cost',
    description:
      'By obtaining estimates from three different HVAC contractors, you can compare the costs of the equipment, labor, and any additional services they may offer. This can give you a clearer picture of the market prices and help you avoid overpaying.',
  },
  {
    img: ServiceCardB,
    title: 'Different Approaches and Solutions',
    description:
      'Different contractors might propose slightly different solutions or equipment options based on their expertise and experience. Having multiple estimates allows you to evaluate these options and choose the one that best fits your needs and budget.',
  },
  {
    img: ServiceCardC,
    title: 'Educational Value',
    description:
      'The estimate process can provide you with valuable education about HVAC systems, different types of equipment, and the installation process. This knowledge can empower you to make informed decisions about your HVAC needs.',
  },
];

const ServiceCard = ({ title, description, img, initialX }) => {
  const control = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      control.start('visible');
    }
  }, [control, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: initialX }}
      animate={control}
      variants={{
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
      }}
    >
      <Card sx={{ maxWidth: 360, minHeight: 380, borderRadius: 0 }}>
        <CardMedia
          sx={{ height: 200, ':hover': { transform: 'scale(1.05)' }, cursor: 'pointer' }}
          image={img}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="justify">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const OurServices = () => {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  return (
    <Box mt={4} bgcolor="#F9F6EF">
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container alignItems="center" gap={8} flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
          <Grid item md={5}>
            <Stack
              direction="row"
              justifyContent={mdUp ? 'flex-start' : 'center'}
              alignItems="center"
              gap={2}
            >
              <SquareBox />
              <Typography fontWeight={700}>OUR SERVICES</Typography>
            </Stack>

            <Typography variant="h3" mt={2} textAlign={mdUp ? 'left' : 'center'}>
              When Companies compete for your business you WIN!
            </Typography>
          </Grid>

          <Grid item md={5}>
            <Typography variant="body1" textAlign={mdUp ? 'left' : 'center'}>
              Three main reasons why multiple estimates are important
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }}>
          <Iconify icon="fa-solid:tools" width={28} color="#7AC142" />
        </Divider>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          flexWrap={{ xs: 'wrap', md: 'nowrap' }}
          mt={8}
          gap={4}
        >
          {serviceCardData.map((data, index) => (
            <ServiceCard
              key={data.title}
              title={data.title}
              description={data.description}
              img={data.img}
              initialX={index % 2 === 0 ? -20 : 20}
            />
          ))}
        </Stack>

        <Stack
          mt={8}
          direction="row"
          alignItems="center"
          gap={{ md: 2, xs: 1 }}
          pl={0}
          flexWrap={{ xs: 'wrap', md: 'nowrap' }}
          width={{ md: '50%', xs: '100%' }}
        >
          <Button
            sx={{
              minHeight: 40,
              bgcolor: '#7AC142',
              color: '#ffffff',
              borderRadius: 0,
              width: mdUp ? '50%' : '100%',
              ':hover': {
                bgcolor: '#022a5c',
                color: '#ffffff',
              },
            }}
            onClick={() => navigate('/auth')}
          >
            <Typography fontSize={14}>REQUEST ESTIMASTES</Typography>
          </Button>

          <Stack
            direction="row"
            spacing={1.4}
            alignItems="center"
            justifyContent="center"
            sx={{ width: mdUp ? '50%' : '100%' }}
          >
            <Iconify icon="ic:sharp-phone" color="#7AC142" />
            <Typography
              variant="subtitle1"
              color="#022a5c"
              fontWeight={700}
              sx={{
                cursor: 'pointer',
                ':hover': { color: '#022a5c"' },
                fontSize: { md: 20, xs: 16 },
              }}
            >
              (425) 653-1717
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

ServiceCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  initialX: PropTypes.number,
};

export default OurServices;
