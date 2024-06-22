import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, IconButton, Popover as MuiPopover } from '@mui/material';

import Iconify from 'src/components/iconify';

export const Popover = ({ children }) => {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <Box>
      <IconButton color={open ? 'inherit' : 'default'} onClick={handleOpenMenu}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
      <MuiPopover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={!!open}
        anchorEl={open}
        keepMounted
        onClose={handleCloseMenu}
      >
        {children}
      </MuiPopover>
    </Box>
  );
};

Popover.propTypes = {
  children: PropTypes.element.isRequired,
};
