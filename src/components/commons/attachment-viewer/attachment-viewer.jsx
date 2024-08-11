/* eslint-disable react/prop-types */
import React from 'react';

import { Box, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

export const ImageViewer = ({ imageURL = '', onDelete, onClick, hideDeleteIcon }) => (
  <Box sx={{ position: 'relative', cursor: 'pointer' }}>
    {!hideDeleteIcon && (
      <IconButton sx={{ position: 'absolute', top: -2, right: -2, zIndex: 99 }} onClick={onDelete}>
        <Iconify icon="typcn:delete" width={24} color="#ffffff" />
      </IconButton>
    )}
    <Box style={{ display: 'block', width: '100%' }} onClick={onClick && onClick}>
      <img src={imageURL} alt="" style={{ minHeight: 166, maxHeight: 204 }} />
    </Box>
  </Box>
);
