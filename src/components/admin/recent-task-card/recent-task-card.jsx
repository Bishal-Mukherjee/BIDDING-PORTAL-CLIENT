import PropTypes from 'prop-types';

import { Stack, Paper, Typography } from '@mui/material';

export const RecentTaskCard = ({ id, title, onClick }) => (
  <Stack
    key={`recent-task-${id}`}
    component={Paper}
    elevation={0}
    width="100%"
    height={32}
    overflow="hidden"
    justifyItems="space-between"
    direction="row"
    onClick={onClick}
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
    <Typography key={id} textAlign="left" fontSize={14} sx={{ cursor: 'pointer' }}>
      {title}
    </Typography>
  </Stack>
);

RecentTaskCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};
