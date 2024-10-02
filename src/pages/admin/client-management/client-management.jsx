import { isEmpty } from 'lodash';
import { Helmet } from 'react-helmet-async';
import React, { useMemo, useState, useEffect } from 'react';

import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  Stack,
  Paper,
  Alert,
  Tooltip,
  Backdrop,
  Container,
  Typography,
  IconButton,
  OutlinedInput,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

import { bgGradient } from 'src/theme/css';
import { useAdminManagementStore } from 'src/stores/admin';
import { apiDisassociateClient } from 'src/services/admin';
import { apiDeleteUser } from 'src/firebase/firestore/admin';

import { DataTable } from 'src/components/commons';
import Iconify from 'src/components/iconify/iconify';
import { AddClientDialog, ConfirmDeletion } from 'src/components/admin';

export const ClientManagement = () => {
  const theme = useTheme();

  const { clients, isLoading, getAllClients } = useAdminManagementStore();

  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});
  const [showAlert, setShowAlert] = useState('');
  const [searchQuery, setSearchQuery] = useState({
    value: '',
    regex: /(?:)/i,
  });

  const rows = useMemo(
    () =>
      clients
        ?.filter(
          (task) =>
            searchQuery.regex &&
            (searchQuery.regex.test(task.firstName) ||
              searchQuery.regex.test(task.lastName) ||
              searchQuery.regex.test(task.email) ||
              searchQuery.regex.test(task.phoneNumber))
        )
        .map((row) => ({
          phoneNumber: row.phoneNumber,
          firstName: row.firstName,
          lastName: row.lastName,
          email: row.email,
          address: isEmpty(row?.address) ? '' : `${row?.address?.street}, ${row?.address?.city}`,
        })),
    [searchQuery, clients]
  );

  const onClose = () => {
    setSelectedClient({});
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      await apiDisassociateClient({ email: selectedClient.email });
      await apiDeleteUser({ email: selectedClient.email });
      //   await apiDeleteUserFromAuth({ email: selectedClient.email }); // not needed since Auth doc is not created
      getAllClients();
    } catch (err) {
      setShowAlert(err.response.data.message);
    }
    setLoading(false);
    onClose();
  };

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
  };

  const columns = [
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
        <Tooltip title="Delete Client">
          <IconButton onClick={() => handleDeleteClient(row)}>
            <Iconify icon="mdi:trash" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setShowAlert('');
    }, 3000);
  }, [showAlert]);

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

        <Stack direction="row" justifyContent="flex-end" alignItems="center" mx={{ lg: 8 }}>
          <AddClientDialog />
        </Stack>

        <Alert
          severity="error"
          sx={{
            fontFamily: 'Wix Madefor Display',
            fontWeight: 600,
            display: showAlert ? 'flex' : 'none',
            mx: { lg: 8 },
            mt: 1,
          }}
        >
          {showAlert}
        </Alert>

        <Box sx={{ mx: { lg: 0 } }}>
          <DataTable columns={columns} rows={rows} />
        </Box>
      </Container>

      <ConfirmDeletion
        open={!isEmpty(selectedClient)}
        onClose={() => onClose()}
        selectedEntity={selectedClient}
        onDelete={onDelete}
        isLoading={loading}
      />
    </Box>
  );
};
