import PropTypes from 'prop-types';

import { Chip } from '@mui/material';

const StatusColors = {
  accepted: {
    background: '#90EE90',
    text: '#006400',
  },
  rejected: {
    background: '#f9bec7',
    text: '#d90429',
  },
};

const StatusLabel = {
  accepted: 'ACCEPTED',
  rejected: 'REJECTED',
};

export const BidStatusChip = ({ variant }) => (
  <Chip
    label={StatusLabel[variant]}
    sx={{
      height: 24,
      backgroundColor: StatusColors[variant]?.background,
      color: StatusColors[variant]?.text,
      fontWeight: 600,
      fontFamily: 'Poppins',
      textTransform: 'uppercase',
    }}
  />
);

BidStatusChip.propTypes = {
  variant: PropTypes.oneOf(['accepted', 'rejected']),
};
