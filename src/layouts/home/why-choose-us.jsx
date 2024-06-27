/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { Box, Grid, Stack, Divider, Container, Typography } from '@mui/material';

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

const SquareBox = () => <Box width={16} height={16} bgcolor="#7AC142" />;

const FeatureCard = ({ title, description, icon }) => {
  const control = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3, // Adjust this value to control when the animation triggers
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      control.start('visible');
    } else {
      control.start('hidden');
    }
  }, [control, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={control}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5 }}
    >
      <Stack direction="row" alignItems="flex-start" gap={2} minHeight={100}>
        <Stack bgcolor="#022a5c" p={1} mt={1}>
          {icon}
        </Stack>
        <Stack direction="column" gap={1} width="90%" height="100%">
          <Typography variant="body1" fontWeight={400} fontSize={20}>
            {title}
          </Typography>
          <Typography variant="body1" textAlign="justify" fontSize={16}>
            {description}
          </Typography>
        </Stack>
      </Stack>
    </motion.div>
  );
};

export const WhyChooseUs = () => {
  const mdUp = useResponsive('up', 'md');
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container justifyContent="left">
        <Grid item md={12} sm={12} xs={12}>
          <Stack
            direction="row"
            justifyContent={mdUp ? 'flex-start' : 'center'}
            alignItems="center"
            gap={2}
          >
            <SquareBox />
            <Typography fontWeight={700}>WHY CHOOSE US</Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent={mdUp ? 'flex-start' : 'center'}
            alignItems="center"
            gap={2}
          >
            <Typography variant="h3" mt={4}>
              It&apos;s simple as 1, 2, 3!
            </Typography>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Iconify icon="mdi:thumbs-up" width={28} color="#7AC142" />
          </Divider>

          <Grid container spacing={8} justifyContent="center" flexWrap="wrap">
            {featureCards.map((card, index) => (
              <Grid item md={6} key={index}>
                <FeatureCard
                  title={card.title}
                  description={card.description}
                  icon={<Iconify icon={card.icon} width={28} color="#FFFFFF" />}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

FeatureCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};
