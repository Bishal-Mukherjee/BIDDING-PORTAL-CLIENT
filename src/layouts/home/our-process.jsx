/* eslint-disable react/prop-types */
import React from 'react';

import { Box, Card, Stack, Rating, Divider, Container, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

const processCardData = [
  {
    icon: 'dashicons:analytics',
    title: 'Assessment and Consultation',
    description:
      'Finish a brief consultation with an HVAC expert to review current needs and sizing of your equipment.',
  },
  {
    icon: 'vaadin:tools',
    title: 'Estimate Process',
    description:
      'Our HVAC expert sends off the information gathered from the consultation to numerous highly rated HVAC companies in your area.',
  },
  {
    icon: 'material-symbols:cycle',
    title: 'Estimate Selection',
    description:
      'Within 72 hours, HVAC Negotiators will contact you with the estimates from the various companies for you to select, making this process as painless and easy as possible. No sales, just selection.',
  },
];

const SquareBox = () => <Box width={16} height={16} bgcolor="#7AC142" />;

const ProcessCard = ({ icon, title, description, step = 1 }) => (
  <Card
    sx={{
      maxWidth: 340,
      minHeight: 360,
      maxHeight: 360,
      borderRadius: 0,
      bgcolor: '#F9F6EF',
      p: 2,
    }}
  >
    <Stack
      position="absolute"
      justifyContent="center"
      alignItems="center"
      width={124}
      height={20}
      bgcolor="#04192a"
      top={24}
      left={-28}
      sx={{ transform: 'rotate(-45deg)' }}
    >
      <Typography color="#FFFFFF" variant="subtitle2">
        STEP {step}
      </Typography>
    </Stack>

    <Stack width="100%" minHeight={168} direction="row" alignItems="center" justifyContent="center">
      <Iconify icon={icon} width={64} color="#7AC142" />
    </Stack>

    <Stack gap={1} direction="column" alignItems="center" justifufyContent="center">
      <Typography textAlign="center" gutterBottom variant="h4" component="div">
        {title}
      </Typography>
      <Typography textAlign="center" variant="body2">
        {description}
      </Typography>
    </Stack>
  </Card>
);

export const OurProcess = () => (
  <Box mt={4}>
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack direction="row" justifyContent="center" alignItems="center" gap={2}>
        <SquareBox />
        <Typography fontWeight={700}>OUR PROCESS</Typography>
      </Stack>

      <Typography variant="h3" mt={2} textAlign="center">
        How It Works?
      </Typography>

      <Divider sx={{ my: 3 }}>
        <Iconify icon="fa-solid:tools" width={28} color="#7AC142" />
      </Divider>

      <Typography variant="subtitle1" textAlign="center">
        Here are three steps outlining how HVAC Negotiators system works:
      </Typography>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        flexWrap="wrap"
        gap={4}
        mt={4}
      >
        {processCardData.map((item, index) => (
          <ProcessCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
            step={index + 1}
          />
        ))}
      </Stack>

      <Typography variant="body1" textAlign="center" mt={4}>
        &quot;At HVAC Negotiators, we deliver a 5-star experience:&quot;
      </Typography>

      <Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
        <Rating value={5} readOnly sx={{ gap: 2 }} size="large" />
      </Stack>
    </Container>

    <Box height={10} />
  </Box>
);
