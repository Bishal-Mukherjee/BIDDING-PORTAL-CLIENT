/* eslint-disable react/prop-types */
import React from 'react';

import {
  Box,
  Grid,
  Stack,
  styled,
  Button,
  Divider,
  Typography,
  Container as MuiContainer,
} from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';

const featureCards = [
  {
    icon: 'fontisto:calendar',
    title: 'Schedule Your Appointment',
    description:
      "Are you prepared to enhance your home's comfort and energy efficiency? Your journey to receiving three competitive estimates for a new high-quality heating and cooling system begins here, and we are excited to be your trusted guide! Scheduling your appointment is effortless. You can either book online or call us today at (425) 653-1717. We understand that your time is precious, so we will work with your schedule to determine the most convenient time for you.",
  },
  {
    icon: 'clarity:blocks-group-solid-badged',
    title: 'Meet With a HVAC Consultant',
    description:
      'Have a knowledgeable and friendly HVAC Consultant arrive at your doorstep ready to listen, assess, and understand your heating and cooling needs. During the visit, you will have the opportunity to discuss your preferences, ask questions, and explore all your possibilities for purchasing your new HVAC system. Our Design Consultants are not just experts; they are partners committed to finding the ideal HVAC solution for your unique needs.',
  },
  {
    icon: 'ion:document-text',
    title: 'Choose Your Ideal Estimate in 72 Hours',
    description:
      "After your consultation, our team springs into action. Within 72 hours, you'll receive a minimum of 3 estimates from top 5-star-rated Heating and Air Conditioning companies in your area. These estimates are more than just numbers; they are comprehensive solutions meticulously tailored to match your HVAC specifications, all with a focus on helping you achieve significant cost savings. Now, the power is firmly in your hands. You can confidently compare, analyze, and choose the estimate that aligns perfectly with your vision and budget, all while realizing substantial cost savings. With these competitive estimates, you have the freedom to make an informed decision that suits your specific needs and preferences while keeping more of your hard-earned money where it belongs.",
  },
];

const Container = styled(MuiContainer)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
}));

const SquareBox = () => <Box width={16} height={16} bgcolor="#7AC142" />;

const StyledCard = ({ title, description, icon }) => (
  <Stack direction="row" alignItems="flex-start" gap={2} minHeight={100}>
    <Stack bgcolor="#022a5c" p={1} mt={1}>
      {icon}
    </Stack>
    <Stack direction="column" gap={1} width="90%" height="100%">
      <Typography variant="body1" fontWeight={400} fontSize={20}>
        {title}
      </Typography>
      <Typography variant="body1" fontSize={16}>
        {description}
      </Typography>
    </Stack>
  </Stack>
);

export const WhyChooseUs = () => {
  const mdUp = useResponsive('up', 'md');

  console.log(mdUp);

  return (
    <Container maxWidth="lg" sx={{ pb: 10, position: 'absolute' }}>
      <Grid
        container
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{ pl: mdUp ? 20 : 0 }}
      >
        <Grid item md={6} sm={12} xs={12} gap={2}>
          <Stack direction="row" alignItems="center" gap={2} mt={12}>
            <SquareBox />
            <Typography fontWeight={700}>WHY CHOOSE US</Typography>
          </Stack>

          <Typography variant="h3" mt={4}>
            It&apos;s simple as 1, 2, 3!
          </Typography>

          <Divider sx={{ my: 3 }}>
            <Iconify icon="mdi:thumbs-up" width={28} color="#7AC142" />
          </Divider>

          <Stack direction="column" gap={4} alignItems="flex-start">
            {featureCards.map((card, index) => (
              <StyledCard
                key={index}
                title={card.title}
                description={card.description}
                icon={<Iconify icon={card.icon} width={28} color="#FFFFFF" />}
              />
            ))}

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
                width: '100%',
              }}
            >
              <Typography color="#022a5c">REQUEST ESTIMASTES</Typography>
            </Button>
          </Stack>
        </Grid>

        {/* <Grid item md={6} sm={12} xs={12} mt={12} p={8}>
          <img
            alt="why-choose-us"
            src="https://hvacnegotiators.com/wp-content/uploads/elementor/thumbs/AircorA-DlrPhoto_Couple_wDealer_outs_300415211249-160823-57bba0fd47ae0-qavjw0xv9er1irfidb4dh1zr6pqfv6hvwvlhhoddzs.jpg"
            width={480}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
};
