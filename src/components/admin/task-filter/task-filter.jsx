import { useState } from 'react';

import { Box, Chip, Stack, Popover, Tooltip, MenuItem, IconButton } from '@mui/material';

import { useTaskStore } from 'src/stores/admin';

import Iconify from 'src/components/iconify';

const MENU_OPTIONS = [
  { id: 1, label: 'Created', value: 'created' },
  { id: 2, label: 'Assigned', value: 'assigned' },
  { id: 3, label: 'In Progress', value: 'in-progress' },
  { id: 4, label: 'Completed', value: 'completed' },
];

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
        <Chip
          label={String(appliedFilter).toUpperCase()}
          sx={{ fontFamily: 'Wix Madefor Display', fontSize: 12 }}
        />
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
              fontFamily: 'Wix Madefor Display',
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
