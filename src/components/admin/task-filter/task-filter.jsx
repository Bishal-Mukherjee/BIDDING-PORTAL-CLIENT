import { useState } from 'react';

import { Box, Chip, Stack, Popover, Tooltip, MenuItem, IconButton } from '@mui/material';

import { useTaskStore } from 'src/stores/admin';
import { StatusLabel, STATUS_MENU_OPTIONS as MENU_OPTIONS } from 'src/constants';

import Iconify from 'src/components/iconify';

export const TaskFilter = () => {
  const { getAllTasks } = useTaskStore();
  const [open, setOpen] = useState(null);
  const [appliedFilter, setAppliedFilter] = useState('created');

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChange = (status) => {
    setAppliedFilter(status);
    getAllTasks({ status });
  };

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Chip label={StatusLabel[appliedFilter]} sx={{ fontSize: 12 }} />
        <Box sx={{ ml: 1, mr: -0.4 }}>
          <Iconify icon="codicon:circle-filled" width={10} />
        </Box>
        <Tooltip title="Filter tasks by">
          <IconButton onClick={handleOpen}>
            <Iconify icon="mdi:filter" />
          </IconButton>
        </Tooltip>
      </Stack>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ p: 1 }}
      >
        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            sx={{
              ...(appliedFilter === option.value && {
                fontWeight: appliedFilter === option.value ? 600 : 400,
                bgcolor: appliedFilter === option.value ? '#e9ecef' : 'unset',
              }),
            }}
            onClick={() => handleChange(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
};
