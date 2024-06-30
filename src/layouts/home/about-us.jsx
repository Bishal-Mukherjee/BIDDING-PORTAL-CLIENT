/* eslint-disable import/no-extraneous-dependencies */

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { Grid, Stack, Divider, Container, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import AboutUsImg from 'src/assets/images/about-us.jpg';
import RepairmanImg from 'src/assets/images/repairman.jpg';

import Iconify from 'src/components/iconify';
import { SquareBox } from 'src/components/commons';

const ListItem = ({ content }) => (
  <Stack direction="row" gap={2} alignItems="center">
    <Iconify icon="lets-icons:check-fill" width={24} />
    <Typography variant="subtitle2">{content}</Typography>
  </Stack>
);

const AboutUs = () => {
  const mdUp = useResponsive('up', 'md');

  const control = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  //   const navigate = useNavigate();

  useEffect(() => {
    if (inView) {
      control.start('visible');
    }
  }, [control, inView]);

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 8, mt: 4 }}>
        <Grid
          container
          alignItems="center"
          gap={{ md: 12, xs: 4 }}
          flexWrap={{ xs: 'wrap', md: 'nowrap' }}
        >
          <Grid item md={5}>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -20 }}
              animate={control}
              variants={{
                visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
              }}
            >
              <Stack
                direction="row"
                justifyContent={mdUp ? 'flex-start' : 'center'}
                alignItems="center"
                gap={2}
              >
                <SquareBox />
                <Typography fontWeight={700}>ABOUT US</Typography>
              </Stack>

              <Typography variant="h3" mt={2} textAlign={mdUp ? 'left' : 'center'}>
                Your Trusted HVAC Experts
              </Typography>

              <Divider sx={{ my: 3 }}>
                <Iconify icon="fa-solid:fan" width={28} color="#7AC142" />
              </Divider>

              <Typography variant="body1">
                At HVAC Negotiators, we are about providing you with a seamless experience from
                start to finish. With our three-step process, you are not just a customer; you are a
                valued partner. HVAC Negotiators will transform your HVAC journey into a hassle-free
                and rewarding adventure.
              </Typography>

              <Stack direction="column" alignItems="flex-start" gap={1.8} mt={4}>
                <ListItem content="Customized HVAC solutions to match unique needs." />
                <ListItem content="Focus on durability, energy efficiency, and reliability." />
                <ListItem content="Certified and experienced HVAC technicians." />
                <ListItem content="Promoting eco-friendly HVAC options." />
              </Stack>
            </motion.div>
          </Grid>

          <Grid item md={5}>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: 20 }}
              animate={control}
              variants={{
                visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
              }}
            >
              <img src={AboutUsImg} alt="about-us" width="100%" />
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        mt={4}
        bgcolor="#04192a"
        minHeight={208}
        gap={{ md: 12, xs: 4 }}
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
        p={4}
      >
        <Typography variant="h3" color="#ffffff">
          No sales, just selection.
        </Typography>

        <Stack direction="column" gap={1}>
          <Stack
            borderColor="#7AC142"
            sx={{ border: 'solid 2px #7AC142' }}
            bgcolor="#022a5c"
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={2}
            p={2}
          >
            <img src={RepairmanImg} alt="repairman" width={60} style={{ borderRadius: 50 }} />

            <Stack direction="column" alignItems="flex-start" justifyContent="flex-start">
              <Typography fontSize={14} fontWeight={700} color="#FFFFFF">
                CONSULT WITH AN EXPERT
              </Typography>
              <Typography variant="h6" color="#7AC142">
                (425) 653-1717
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

ListItem.propTypes = {
  content: PropTypes.string.isRequired,
};

export default AboutUs;
