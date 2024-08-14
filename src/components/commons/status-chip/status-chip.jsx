import PropTypes from 'prop-types';

import { Chip } from '@mui/material';

import { StatusLabel } from 'src/constants';
import { StatusColors } from 'src/theme/status-colors';

export const StatusChip = ({ variant }) => (
  <Chip
    label={StatusLabel[variant]}
    sx={{
      height: 24,
      backgroundColor: StatusColors[variant]?.background,
      color: StatusColors[variant]?.text,
      fontWeight: 700,
    }}
  />
);

StatusChip.propTypes = {
  variant: PropTypes.oneOf([
    'created',
    'assigned',
    'in-progress',
    'completed',
    'pending',
    'accepted',
    'rejected',
  ]),
};
