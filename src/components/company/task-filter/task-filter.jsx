import { useState } from 'react';
import PropTypes from 'prop-types';

import { Chip, Stack, Popover, Tooltip, MenuItem, IconButton } from '@mui/material';

import { StatusLabel, STATUS_MENU_OPTIONS as MENU_OPTIONS } from 'src/constants';

import Iconify from 'src/components/iconify';

export const TaskFilter = ({ appliedFilter, setAppliedFilter }) => {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Chip label={StatusLabel[appliedFilter]} sx={{ fontSize: 12, mr: 1 }} />
        <Iconify icon="codicon:circle-filled" width={10} />
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
            onClick={() => setAppliedFilter(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
};

TaskFilter.propTypes = {
  appliedFilter: PropTypes.string,
  setAppliedFilter: PropTypes.func,
};
