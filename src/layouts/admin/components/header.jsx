import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Box, Chip, Stack, AppBar, Toolbar } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';
import HvacLogo from 'src/assets/images/hvac-logo.png';

import { HEADER } from './config-layout';
import { MenuPopover } from './menu-popover';
import { AccountPopover } from './account-popover';
import { NotificationsPopover } from './notifications-popover';

// ----------------------------------------------------------------------

const navLinks = [
  {
    id: 1,
    label: 'Bids',
    pathname: '/admin/analytics',
  },
  {
    id: 2,
    label: 'Clients',
    pathname: '/admin/clients',
  },
  {
    id: 2,
    label: 'Partners',
    pathname: '/admin/companies',
  },
  //   {
  //     id: 3,
  //     label: 'Reports',
  //     pathname: '/admin/reports',
  //   },
];

export default function Header({ onOpenNav }) {
  const { pathname } = useLocation();
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && { height: HEADER.H_DESKTOP }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={HvacLogo} alt="Hvac Logo" width={148} />
      </Toolbar>
      <Stack alignItems="center" justifyContent="center">
        <Stack
          minHeight={52}
          bgcolor="#022a5c"
          width="100%"
          alignItems="center"
          justifyContent="flex-start"
          direction="row"
          gap={4}
          sx={{ px: 2, pl: { lg: 12, sm: 2, md: 2 } }}
        >
          {navLinks.map((link) => (
            <Stack
              width={84}
              height="100%"
              alignItems="center"
              justifyContent="center"
              direction="column"
              display={{ lg: 'flex', xs: 'none', sm: 'none' }}
              key={`admin-link-${link.id}`}
            >
              <Link
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontFamily: 'Poppins',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
                to={link.pathname}
              >
                {link.label}
              </Link>

              <Box
                sx={{
                  ...(pathname.includes(link.pathname) && {
                    borderBottomColor: '#7AC412',
                    borderBottom: 'solid 4px #7AC412',
                  }),
                  height: 16,
                  width: 104,
                  position: 'absolute',
                  bottom: -8,
                  display: { lg: 'block', sm: 'none', xs: 'none' },
                }}
              />
            </Stack>
          ))}

          <MenuPopover />

          <Stack
            sx={{ ml: 'auto', alignItems: 'center', justifyContent: 'center' }}
            gap={1}
            direction="row"
          >
            <Chip
              label="ADMIN"
              sx={{
                bgcolor: '#7AC412',
                color: '#FFFFFF',
                fontWeight: 600,
                fontFamily: 'Poppins',
                ml: 'auto',
              }}
            />
            <NotificationsPopover />
            <AccountPopover />
          </Stack>
        </Stack>
      </Stack>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
