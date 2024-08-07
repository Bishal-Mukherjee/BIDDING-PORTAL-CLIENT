import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Stack,
  Paper,
  styled,
  Backdrop,
  Container,
  Typography,
  OutlinedInput,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

import { bgGradient } from 'src/theme/css';
import { useTaskStore } from 'src/stores/admin';

import Iconify from 'src/components/iconify/iconify';
import { TaskFilter, CreateAnIssue, SearchableTaskList } from 'src/components/admin';

const Item = styled(Card)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  bgcolor: alpha(theme.palette.grey[900], 0.72),
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  //   borderRadius: 5,
}));

export function Analytics() {
  const theme = useTheme();

  const navigate = useNavigate();

  const { isLoading, getAllTasks, recentTasks, getRecentTasks } = useTaskStore();

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

  const handleViewClick = (ticketId) => {
    navigate(`/admin/analytics/${ticketId}`, { state: { mode: 'view' } });
  };

  useEffect(() => {
    getAllTasks({});
  }, [getAllTasks]);

  useEffect(() => {
    getRecentTasks();
  }, [getRecentTasks]);

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
        }),
        height: 1,
      }}
    >
      <Helmet>
        <title> Admin | Analytics </title>
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
          Bids Dashboard
        </Typography>
        <Typography variant="body2" textAlign="center" fontFamily="Wix Madefor Display">
          Track and manage tickets efficiently with real-time updates.
        </Typography>
      </Stack>

      <Container maxWidth sx={{ mb: 80 }}>
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
          gap={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ px: { lg: 8 } }}
        >
          <CreateAnIssue />
          <TaskFilter />
        </Stack>

        <Grid container spacing={2} px={{ lg: 8, sm: 0, xs: 0 }} height={480} mt={0}>
          <Grid item xs={2.6} sx={{ display: { lg: 'block', sm: 'none', xs: 'none' } }}>
            <Item sx={{ height: '100%', pt: 2 }}>
              <Typography textAlign="left" variant="h6" fontWeight={500}>
                Recent tickets
              </Typography>
              <Stack
                width="100%"
                height="100%"
                direction="column"
                alignItems="flex-start"
                spacing={1}
                mt={2}
              >
                {recentTasks.map((task) => (
                  <Stack
                    key={`recent-task-${task.id}`}
                    component={Paper}
                    elevation={0}
                    width="100%"
                    height={32}
                    overflow="hidden"
                    justifyItems="space-between"
                    direction="row"
                    onClick={() => handleViewClick(task.id)}
                    m={1}
                    pl={1}
                    py={1}
                    borderRadius={0}
                    bgcolor="#f8f9fa"
                    sx={{
                      cursor: 'pointer',
                      ':hover': {
                        transform: 'scale(1.01)',
                      },
                    }}
                  >
                    <Typography
                      key={task.id}
                      textAlign="left"
                      fontSize={14}
                      sx={{ cursor: 'pointer' }}
                    >
                      {task.title}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Item>
          </Grid>

          <Grid item md={9.4} sm={12} xs={12} height="100%">
            <SearchableTaskList searchQuery={searchQuery} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
