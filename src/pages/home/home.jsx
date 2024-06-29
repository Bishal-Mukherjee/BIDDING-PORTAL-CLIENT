import { Helmet } from 'react-helmet-async';
import React, { lazy, Suspense } from 'react';

import { Backdrop, CircularProgress } from '@mui/material';

const Header = lazy(() => import('src/layouts/home/header'));
const Footer = lazy(() => import('src/layouts/home/footer'));
const AboutUs = lazy(() => import('src/layouts/home/about-us'));
const HomeBanner = lazy(() => import('src/layouts/home/home-banner'));
const OurProcess = lazy(() => import('src/layouts/home/our-process'));
const OurServices = lazy(() => import('src/layouts/home/our-services'));
const WhyChooseUs = lazy(() => import('src/layouts/home/why-choose-us'));
const Testimonials = lazy(() => import('src/layouts/home/testimonials'));

const Loader = () => (
  <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export const Home = () => (
  <>
    <Helmet>
      <title> HVAC Negotiators </title>
    </Helmet>

    <Suspense fallback={<Loader />}>
      <Header />
      <HomeBanner />
      <WhyChooseUs />
      <OurServices />
      <AboutUs />
      <OurProcess />
      <Testimonials />
      <Footer />
    </Suspense>
  </>
);
