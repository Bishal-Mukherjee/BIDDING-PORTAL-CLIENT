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

import { useTaskStore } from 'src/stores/company';
import { useAuth } from 'src/context/authContext';

import Iconify from 'src/components/iconify/iconify';
import { TaskFilter, SearchableTaskList } from 'src/components/company';

export const Analytics = () => {
  const { user } = useAuth();
  const { getAllTasks, isLoading, getRecentAcceptances } = useTaskStore();

  const [searchQuery, setSearchQuery] = useState({
    value: '',
    regex: /(?:)/i,
  });
  const [appliedStatusFilter, setAppliedStatusFilter] = useState('created');

  const handleSearch = (query) => {
    if (query.trim() !== '') {
      const regex = new RegExp(query, 'i');
      setSearchQuery({ ...searchQuery, value: query, regex });
    } else {
      setSearchQuery({ value: '', regex: /(?:)/i });
    }
  };

  useEffect(() => {
    getAllTasks({
      status: appliedStatusFilter,
      email: user?.email,
    });
  }, [getAllTasks, user, appliedStatusFilter]);

  useEffect(() => {
    getRecentAcceptances();
  }, [getRecentAcceptances]);

  return (
    <>
      <Helmet>
        <title> Company | Analytics </title>
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
          Tickets Dashboard
        </Typography>
        <Typography variant="body2" textAlign="center" fontFamily="Wix Madefor Display">
          Track and manage tickets efficiently with real-time updates.
        </Typography>
      </Stack>

      <Container maxWidth>
        <Box component={Paper} elevation={5} mx={{ lg: 8, md: 8, sm: 0, xs: 0 }} mt={4} mb={0}>
          <OutlinedInput
            value={searchQuery.value}
            onChange={(e) => handleSearch(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="material-symbols:search" />
              </InputAdornment>
            }
            placeholder="Search tickets"
            fullWidth
          />
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          mx={{ lg: 8, md: 8, sm: 0, xs: 0 }}
          mt={2}
          mb={0}
        >
          <TaskFilter
            appliedFilter={appliedStatusFilter}
            setAppliedFilter={setAppliedStatusFilter}
          />
        </Stack>

        <SearchableTaskList searchQuery={searchQuery} appliedStatusFilter={appliedStatusFilter} />
      </Container>
    </>
  );
};
