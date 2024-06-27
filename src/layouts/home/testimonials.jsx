/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */

import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import {
  Box,
  Card,
  Stack,
  Rating,
  Divider,
  Container,
  Typography,
  FormHelperText,
} from '@mui/material';

import AboutUsBgImg from 'src/assets/images/about-us-bg.jpg';

import Iconify from 'src/components/iconify';

const testimonialsData = [
  {
    name: 'Mark T',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    text: "As a business owner, I understand the importance of a well-functioning HVAC system. That's why I turned to HVAC Negotiators for all my heating, ventilation, and air conditioning needs. Their team's expertise is evident in the efficiency of their process. Their commitment to excellent customer service truly sets them apart. I trust them completely with my commercial HVAC needs.",
    title: 'Commercial Property Owner',
    rating: 5,
  },
  {
    name: 'Lisa K',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    text: "HVAC Negotiators was absolutely amazing in getting me quotes from the companies they work with. They weren't there for a sales pitch, but to find the best solutions for my HVAC needs. They were very professional and highly efficient in the consultation process. HVAC Negotiators is the best at what they do!",
    title: 'Residential Customer',
    rating: 5,
  },
  {
    name: 'Sarah H',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    text: 'Our HVAC expert was knowledgable and efficient. I was able to select the best options for my HVAC needs within 72 hours. This process was quick and painless, just as they promised. I would highly recommend HVAC Negotiators.',
    title: 'Commercial Property Owner',
    rating: 5,
  },
];

const SquareBox = () => <Box width={16} height={16} bgcolor="#7AC142" />;

const TestimonialCard = ({ name, avatar, text, title, rating }) => {
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
      initial={{ opacity: 0, x: 20 }}
      animate={control}
      variants={{
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
      }}
    >
      <Card
        sx={{
          maxWidth: 360,
          minHeight: 360,
          maxHeight: 360,
          borderRadius: 0,
          bgcolor: '#F9F6EF',
          //   p: 2,
        }}
      >
        <Stack direction="row" bgcolor="#022a5c" p={2}>
          <img src={avatar} alt={name} width={64} height={64} style={{ borderRadius: 50 }} />
          <Stack
            ml={2}
            width="100%"
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Typography fontWeight={500} color="#FFFFFF">
              {name}
            </Typography>
            <Rating size="small" sx={{ color: '#7AC142' }} value={rating} readOnly />
            <FormHelperText sx={{ color: 'FFFFFFD6' }}>{title}</FormHelperText>
          </Stack>
        </Stack>

        <Box p={2}>
          <Typography variant="body2" textAlign="left" color="#3E4751">
            {text}
          </Typography>
        </Box>
      </Card>
    </motion.div>
  );
};

export const Testimonials = () => {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const parallaxContainer = parallaxRef.current;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      parallaxContainer.style.backgroundPositionY = `${scrollTop * 0.5}px`; // Adjust 0.5 for the parallax speed
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      ref={parallaxRef}
      sx={{
        backgroundImage: `url(${AboutUsBgImg})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        my: 4,
      }}
    >
      <Box bgcolor="rgba(4, 25, 42, 0.6)">
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Stack direction="row" justifyContent="center" alignItems="center" gap={2}>
            <SquareBox />
            <Typography fontWeight={700} color="#FFFFFF">
              TESTIMONIALS
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="center" alignItems="center">
            <Box maxWidth={400}>
              <Typography variant="h3" mt={2} textAlign="center" color="#FFFFFF">
                Our clients&apos; satisfaction is important to us.
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Iconify icon="fa-solid:tools" width={28} color="#7AC142" />
          </Divider>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            flexWrap="wrap"
            gap={4}
            mt={4}
          >
            {testimonialsData.map((item, index) => (
              <TestimonialCard
                key={index}
                name={item.name}
                avatar={item.avatar}
                text={item.text}
                title={item.title}
                rating={item.rating}
              />
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

TestimonialCard.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};
