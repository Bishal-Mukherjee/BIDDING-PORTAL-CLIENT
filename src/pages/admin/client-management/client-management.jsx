import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';

import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  Stack,
  Paper,
  Button,
  Backdrop,
  Container,
  Typography,
  ButtonGroup,
  OutlinedInput,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

import { bgGradient } from 'src/theme/css';
import { useAdminManagementStore } from 'src/stores/admin';

import Iconify from 'src/components/iconify/iconify';
import { AddClientDialog, ClientDataTable as DataTable } from 'src/components/admin';

const tabs = [
  {
    label: 'Active Clients',
    value: 'active',
  },
];

const activeClientColums = [
  { label: 'Phone Number', key: 'phoneNumber' },
  { label: 'First Name', key: 'firstName', align: 'right' },
  { label: 'Last Name', key: 'lastName', align: 'right' },
  { label: 'Email', key: 'email', align: 'right' },
  { label: 'Address', key: 'address', align: 'right' },
];

const interestedClientColums = [
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Email', key: 'email' },
  { label: 'Phone Number', key: 'phoneNumber' },
  { label: 'Message', key: 'message', align: 'right' },
];

export const ClientManagement = () => {
  const theme = useTheme();

  const { getAllClients, getAllInterestedClients, isLoading } = useAdminManagementStore();

  const [searchQuery, setSearchQuery] = useState({
    value: '',
    regex: /(?:)/i,
  });
  const [tab, setTab] = useState(tabs[0].value);
  const [columns, setColumns] = useState(activeClientColums);

  const handleSearch = (query) => {
    if (query.trim() !== '') {
      const regex = new RegExp(query, 'i');
      setSearchQuery({ ...searchQuery, value: query, regex });
    } else {
      setSearchQuery({ value: '', regex: /(?:)/i });
    }
  };

  const handleTabToggle = (tempTab) => {
    if (tempTab === 'active') {
      setColumns(activeClientColums);
      getAllClients();
    } else if (tempTab === 'interested') {
      setColumns(interestedClientColums);
      getAllInterestedClients();
    }
    setTab(tempTab);
  };

  useEffect(() => {
    getAllClients();
  }, [getAllClients]);

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          //   imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Helmet>
        <title> Admin | Client Management </title>
      </Helmet>

      <Backdrop sx={{ color: '#fff', zIndex: (t) => t.zIndex.drawer + 1 }} open={isLoading}>
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
            placeholder="Search clients..."
            fullWidth
          />
        </Box>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mx={{ lg: 8 }}>
          <ButtonGroup variant="outlined" sx={{ mt: 2 }}>
            {tabs.map((t) => (
              <Button
                key={t.value}
                onClick={() => handleTabToggle(t.value)}
                variant={tab === t.value ? 'contained' : 'outlined'}
              >
                {t.label}
              </Button>
            ))}
          </ButtonGroup>
          <AddClientDialog />
        </Stack>

        <DataTable searchQuery={searchQuery} columns={columns} />
      </Container>
    </Box>
  );
};
