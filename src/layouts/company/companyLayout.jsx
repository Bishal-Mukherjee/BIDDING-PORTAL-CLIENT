/* eslint-disable react-hooks/exhaustive-deps */
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Box } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/context/authContext';

import { MetaInfoDialog } from 'src/components/company';

import Main from './components/main';
import Header from './components/header';

CompanyLayout.propTypes = {
  children: PropTypes.node,
};

export function CompanyLayout({ children }) {
  const location = useLocation();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!isEmpty(user) && user?.designation !== 'COMPANY') {
      router.push('/');
    }
  }, [location.pathname, router, user]);

  return (
    <>
      <Header />
      <Box sx={{ minHeight: 1, display: 'flex', mt: { lg: 0, sm: 4, xs: 4 } }}>
        <Main>{children}</Main>
      </Box>
      <MetaInfoDialog />
    </>
  );
}
