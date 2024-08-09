import PropTypes from 'prop-types';

import { Card, IconButton, Typography } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

export const AttachmentCard = ({ index, attachment, onDelete }) => (
  <Card
    sx={{
      width: onDelete ? 172 : 140,
      height: 52,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 1,
      borderRadius: 1,
      overflow: 'hidden',
    }}
  >
    <a href={attachment} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
      <Typography variant="body2" color="#000000">
        {index}.&nbsp; Attachment
      </Typography>
    </a>

    {onDelete && (
      <IconButton onClick={onDelete}>
        <Iconify icon="mdi:close" width={24} color="#000000" />
      </IconButton>
    )}
  </Card>
);

AttachmentCard.propTypes = {
  attachment: PropTypes.string,
  index: PropTypes.number,
  onDelete: PropTypes.func,
};
