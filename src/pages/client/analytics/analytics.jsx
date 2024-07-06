/* eslint-disable import/no-extraneous-dependencies */
import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';

import { alpha, useTheme } from '@mui/material/styles';
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

import { bgGradient } from 'src/theme/css';
import { useTaskStore } from 'src/stores/client';

import Iconify from 'src/components/iconify/iconify';
import {
  TaskFilter,
  // CreateAnIssue,
  SearchableTaskList,
} from 'src/components/client';

export function Analytics() {
  const theme = useTheme();

  const { isLoading, getAllTasks } = useTaskStore();

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
    getAllTasks({});
  }, [getAllTasks]);

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
        <title> Client | Analytics </title>
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
          Tickets Dashboard
        </Typography>
        <Typography variant="body2" textAlign="center" fontFamily="Wix Madefor Display">
          Track and manage your tickets efficiently with real-time updates.
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
            placeholder="Search tickets..."
            fullWidth
          />
        </Box>

        <Stack
          sx={{ px: { lg: 8 } }}
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Stack spacing={1} direction="row" alignItems="center" justifyContent="flex-end">
            {/* <CreateAnIssue /> */}
            <TaskFilter />
          </Stack>
        </Stack>

        <SearchableTaskList searchQuery={searchQuery} />
      </Container>
    </Box>
  );
}
