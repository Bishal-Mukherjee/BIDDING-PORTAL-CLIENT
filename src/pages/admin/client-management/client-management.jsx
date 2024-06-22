import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';

import {
  Box,
  Stack,
  Paper,
  Backdrop,
  Container,
  Typography,
  OutlinedInput,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

import { useAdminManagementStore } from 'src/stores/admin';

import Iconify from 'src/components/iconify/iconify';
import { ClientDataTable, AddClientDialog } from 'src/components/admin';

export const ClientManagement = () => {
  const { getAllClients, isLoading } = useAdminManagementStore();

  const [searchQuery, setSearchQuery] = useState({
    value: '',
    regex: /(?:)/i,
  });

  const handleSearch = (query) => {
    if (query.trim() !== '') {
      const regex = new RegExp(query, 'i');
      setSearchQuery({ ...searchQuery, value: query, regex });
    } else {
      setSearchQuery({ value: '', regex: /(?:)/i });
    }
  };

  useEffect(() => {
    getAllClients();
  }, [getAllClients]);

  return (
    <>
      <Helmet>
        <title> Admin | Client Management </title>
      </Helmet>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Stack
        direction="column"
        width="100%"
        minHeight={108}
        bgcolor="#F9F6EF"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3" fontFamily="Poppins">
          Client Management
        </Typography>
        <Typography variant="body2" textAlign="center" fontFamily="Wix Madefor Display">
          Manage clients, manage your business.
        </Typography>
      </Stack>

      <Container maxWidth>
        <Box component={Paper} elevation={5} sx={{ mx: { lg: 8 }, mt: 4, mb: 2 }}>
          <OutlinedInput
            value={searchQuery.value}
            onChange={(e) => handleSearch(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="material-symbols:search" />
              </InputAdornment>
            }
            placeholder="Search users"
            fullWidth
          />
        </Box>

        <Stack direction="row" justifyContent="flex-end" alignItems="center" mx={{ lg: 8 }}>
          <AddClientDialog />
        </Stack>

        <ClientDataTable searchQuery={searchQuery} />
      </Container>
    </>
  );
};
