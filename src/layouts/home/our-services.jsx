/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

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

import Iconify from 'src/components/iconify';

const SquareBox = () => <Box width={16} height={16} bgcolor="#7AC142" />;

const ServicesCard = ({ title, description, img }) => (
  <Card sx={{ maxWidth: 360, minHeight: 380, borderRadius: 0 }}>
    <CardMedia sx={{ height: 200 }} image={img} title={title} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const serviceCardData = [
  {
    img: 'src/assets/images/services/service-card-a.jpg',
    title: 'Comparison of Cost',
    description:
      'By obtaining estimates from three different HVAC contractors, you can compare the costs of the equipment, labor, and any additional services they may offer. This can give you a clearer picture of the market prices and help you avoid overpaying.',
  },
  {
    img: 'src/assets/images/services/service-card-b.jpg',
    title: 'Different Approaches and Solutions',
    description:
      'Different contractors might propose slightly different solutions or equipment options based on their expertise and experience. Having multiple estimates allows you to evaluate these options and choose the one that best fits your needs and budget.',
  },
  {
    img: 'src/assets/images/services/service-card-c.jpg',
    title: 'Educational Value',
    description:
      'The estimate process can provide you with valuable education about HVAC systems, different types of equipment, and the installation process. This knowledge can empower you to make informed decisions about your HVAC needs.',
  },
];

export const OurServices = () => {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  return (
    <Box mt={8} bgcolor="#F9F6EF">
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
          {serviceCardData.map((data) => (
            <ServicesCard
              key={data.title}
              title={data.title}
              description={data.description}
              img={data.img}
            />
          ))}
        </Stack>

        <Stack
          mt={8}
          direction="row"
          alignItems="center"
          gap={2}
          flexWrap={{ xs: 'wrap', md: 'nowrap' }}
          width={{ md: '50%', xs: '100%' }}
        >
          <Button
            sx={{
              minHeight: 48,
              bgcolor: '#7AC142',
              color: '#ffffff',
              borderRadius: 0,
              ':hover': {
                bgcolor: '#022a5c',
                color: '#ffffff',
              },
              width: mdUp ? '50%' : '100%',
            }}
            onClick={() => navigate('/auth')}
          >
            <Typography fontSize={18} color="#022a5c">
              REQUEST ESTIMASTES
            </Typography>
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
