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
import { apiDisassociateCompany } from 'src/services/admin';
import { apiDeleteUser } from 'src/firebase/firestore/admin';

import { DataTable } from 'src/components/commons';
import Iconify from 'src/components/iconify/iconify';
import { ConfirmDeletion } from 'src/components/admin';

export const CompanyManagement = () => {
  const theme = useTheme();

  const { companies, isLoading, getAllCompanies } = useAdminManagementStore();

  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [showAlert, setShowAlert] = useState('');
  const [searchQuery, setSearchQuery] = useState({
    value: '',
    regex: /(?:)/i,
  });

  const rows = useMemo(
    () =>
      companies?.filter(
        (task) =>
          searchQuery.regex &&
          (searchQuery.regex.test(task.firstName) ||
            searchQuery.regex.test(task.phoneNumber) ||
            searchQuery.regex.test(task.email))
      ),
    [searchQuery, companies]
  );

  const handleSearch = (query) => {
    if (query.trim() !== '') {
      const regex = new RegExp(query, 'i');
      setSearchQuery({ ...searchQuery, value: query, regex });
    } else {
      setSearchQuery({ value: '', regex: /(?:)/i });
    }
  };

  const handleDeleteCompany = async (row) => {
    setSelectedCompany(row);
  };

  const onClose = () => {
    setSelectedCompany({});
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      await apiDisassociateCompany({ email: selectedCompany.email });
      await apiDeleteUser({ email: selectedCompany.email });
      getAllCompanies();
    } catch (err) {
      setShowAlert(err.response.data.message);
    }
    setLoading(false);
    onClose();
  };

  const columns = [
    { label: 'Name', key: 'firstName', align: 'left' },
    { label: 'Phone Number', key: 'phoneNumber', align: 'left' },
    { label: 'Email', key: 'email', align: 'left' },
    {
      label: 'Action',
      key: 'action',
      align: 'right',
      component: (row) => (
        <Tooltip title="Delete Company">
          <IconButton onClick={() => handleDeleteCompany(row)}>
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
    getAllCompanies();
  }, [getAllCompanies]);

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
        <title> Admin | Partner Management </title>
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
          Partner Management
        </Typography>
        <Typography variant="body2" textAlign="center" fontFamily="Wix Madefor Display">
          Manage company details, manage your business.
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
            placeholder="Search partners..."
            fullWidth
          />
        </Box>

        <Alert
          severity="error"
          sx={{
            fontFamily: 'Wix Madefor Display',
            fontWeight: 600,
            display: showAlert ? 'flex' : 'none',
            mx: { lg: 8 },
          }}
        >
          {showAlert}
        </Alert>

        <Box sx={{ mx: { lg: 0 } }}>
          <DataTable columns={columns} rows={rows} />
        </Box>
      </Container>

      <ConfirmDeletion
        open={!isEmpty(selectedCompany)}
        onClose={() => onClose()}
        selectedEntity={selectedCompany}
        onDelete={onDelete}
        isLoading={loading}
      />
    </Box>
  );
};
