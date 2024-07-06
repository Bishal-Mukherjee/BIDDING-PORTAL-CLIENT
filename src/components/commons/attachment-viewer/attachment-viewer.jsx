/* eslint-disable react/prop-types */
import React from 'react';

import { Box, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

export const ImageViewer = ({ imageURL = '', onDelete, hideDeleteIcon }) => (
  <Box sx={{ position: 'relative', cursor: 'pointer' }}>
    {!hideDeleteIcon && (
      <IconButton sx={{ position: 'absolute', top: -2, right: -2 }} onClick={onDelete}>
        <Iconify icon="typcn:delete" width={24} color="#ffffff" />
      </IconButton>
    )}
    <img src={imageURL} alt="" style={{ minHeight: 166, maxHeight: 204 }} />
  </Box>
);
