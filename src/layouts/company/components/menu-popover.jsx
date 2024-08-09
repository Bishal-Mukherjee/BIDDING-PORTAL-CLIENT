import * as React from 'react';
import { Link } from 'react-router-dom';

import { Stack, Popover, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';

const navLinks = [
  {
    id: 1,
    label: 'Bids',
    pathname: '/company/analytics',
  },
];

export const MenuPopover = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Stack
      direction="row"
      alignItems="center"
      display={{ lg: 'none', md: 'none', sm: 'flex', xs: 'flex' }}
    >
      <IconButton onClick={handleClick}>
        <Iconify icon="ion:menu" color="white" width={24} />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        sx={{ paddding: 8 }}
        display={{ lg: 'none', md: 'none', sm: 'flex', xs: 'flex' }}
      >
        <Stack
          direction="column"
          gap={1}
          alignItems="flex-start"
          justifyContent="center"
          minWidth={120}
          minHeight={80}
          pl={2}
        >
          {navLinks.map((link) => (
            <Link
              style={{
                color: '#000000',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
              to={link.pathname}
            >
              {link.label}
            </Link>
          ))}
        </Stack>
      </Popover>
    </Stack>
  );
};
