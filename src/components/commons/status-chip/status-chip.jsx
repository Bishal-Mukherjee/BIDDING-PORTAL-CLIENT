import PropTypes from 'prop-types';

import { Chip } from '@mui/material';

const StatusColors = {
  created: {
    background: '#ADD8E680',
    text: '#00008B',
  },
  assigned: {
    background: '#90EE9080',
    text: '#006400',
  },
  'in-progress': {
    background: '#FFFFE080',
    text: '#9B870C',
  },
  completed: {
    background: '#D3D3D380',
    text: '#696969',
  },
};

const StatusLabel = {
  created: 'CREATED',
  assigned: 'ASSIGNED',
  'in-progress': 'IN PROGRESS',
  completed: 'COMPLETED',
};

export const StatusChip = ({ variant }) => (
  <Chip
    label={StatusLabel[variant]}
    sx={{
      height: 24,
      backgroundColor: StatusColors[variant]?.background,
      color: StatusColors[variant]?.text,
      fontWeight: 700,
      textTransform: 'uppercase',
    }}
  />
);

StatusChip.propTypes = {
  variant: PropTypes.oneOf(['created', 'assigned', 'in-progress', 'completed']),
};
