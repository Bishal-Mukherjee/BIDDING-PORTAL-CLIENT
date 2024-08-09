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
  IconButton,
  ButtonGroup,
  OutlinedInput,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

import { bgGradient } from 'src/theme/css';
import { useAdminManagementStore } from 'src/stores/admin';

import Iconify from 'src/components/iconify/iconify';
import { AddClientDialog, ClientDataTable as DataTable } from 'src/components/admin';
import { ConfirmClientDeletion } from 'src/components/admin/confirm-client-deletion/confirm-client-deletion';

const tabs = [
  {
    label: 'Active Clients',
    value: 'active',
  },
];

export const ClientManagement = () => {
  const theme = useTheme();

  const { getAllClients, isLoading } = useAdminManagementStore();

  const [searchQuery, setSearchQuery] = useState({
    value: '',
    regex: /(?:)/i,
  });
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});

  const handleSearch = (query) => {
    if (query.trim() !== '') {
      const regex = new RegExp(query, 'i');
      setSearchQuery({ ...searchQuery, value: query, regex });
    } else {
      setSearchQuery({ value: '', regex: /(?:)/i });
    }
  };

  const handleDeleteClient = async (row) => {
    setSelectedClient(row);
    setOpen(true);
  };

  const activeClientColums = [
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'First Name', key: 'firstName', align: 'right' },
    { label: 'Last Name', key: 'lastName', align: 'right' },
    { label: 'Email', key: 'email', align: 'right' },
    { label: 'Address', key: 'address', align: 'right' },
    {
      label: 'Action',
      key: 'action',
      align: 'right',
      component: (row) => (
        <IconButton onClick={() => handleDeleteClient(row)}>
          <Iconify icon="mdi:trash" />
        </IconButton>
      ),
    },
  ];

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
                // onClick={() => handleTabToggle(t.value)}
                // variant={tab === t.value ? 'contained' : 'outlined'}
              >
                {t.label}
              </Button>
            ))}
          </ButtonGroup>
          <AddClientDialog />
        </Stack>

        <DataTable searchQuery={searchQuery} columns={activeClientColums} />
      </Container>

      {open && (
        <ConfirmClientDeletion open={open} setOpen={setOpen} selectedClient={selectedClient} />
      )}
    </Box>
  );
};
