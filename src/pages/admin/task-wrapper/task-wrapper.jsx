import React from 'react';
import { useLocation } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';

import { TaskEditView, TaskDetailedView } from 'src/views/admin';

export const TaskWrapper = () => {
  const location = useLocation();
  return (
    <>
      <Stack
        direction="column"
        width="100%"
        minHeight={108}
        bgcolor="#F9F6EF"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3" fontFamily="Poppins">
          Ticket Overview
        </Typography>
        <Typography variant="body2" textAlign="center" fontFamily="Wix Madefor Display">
          Track and manage ticket details.
        </Typography>
      </Stack>

      {location?.state?.mode === 'edit' ? <TaskEditView /> : <TaskDetailedView />}
    </>
  );
};
