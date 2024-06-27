import React from 'react';
import { Helmet } from 'react-helmet-async';

import {
  Header,
  Footer,
  AboutUs,
  HomeBanner,
  OurProcess,
  OurServices,
  WhyChooseUs,
  Testimonials,
} from 'src/layouts/home';

export const Home = () => (
  <>
    <Helmet>
      <title> HVAC Negotiators </title>
    </Helmet>

    <Header />
    <HomeBanner />
    <WhyChooseUs />
    <OurServices />
    <AboutUs />
    <OurProcess />
    <Testimonials />
    <Footer />
  </>
);
