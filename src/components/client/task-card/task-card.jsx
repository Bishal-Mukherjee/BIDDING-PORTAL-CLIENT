/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Box, Stack, MenuItem, Typography } from '@mui/material';

import { trimDescription } from 'src/utils';

import Iconify from 'src/components/iconify';
import { Popover, StatusChip, TaskActiveBadge } from 'src/components/commons';

export const TaskCard = ({ id, title, description, images, status, isActive }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/client/analytics/${id}`, { state: { mode: 'view' } });
  };

  const handleEditClick = () => {
    navigate(`/client/analytics/${id}`, { state: { mode: 'edit' } });
  };

  return (
    <Box width="100%" height="100%">
      <Stack gap={1} px={1} width="100%" height="100%" direction="column">
        <Stack width="100%" direction="row" gap={1} alignItems="center">
          <Stack alignItems="center" justifyContent="center" width={16}>
            <Iconify icon="mingcute:task-2-fill" width={24} />
          </Stack>
          <Typography fontFamily="Wix Madefor Display" fontSize={14} textAlign="left">
            {title}
          </Typography>

          <Box ml="auto">
            <Popover>
              <MenuItem
                onClick={handleViewClick}
                sx={{ fontFamily: 'Wix Madefor Display' }}
                disableTouchRipple
              >
                <Iconify icon="mdi:eye" sx={{ mr: 2 }} />
                View
              </MenuItem>
              <MenuItem
                onClick={handleEditClick}
                sx={{ fontFamily: 'Wix Madefor Display' }}
                disableTouchRipple
                disabled={isActive}
              >
                <Iconify icon="solar:pen-bold" sx={{ mr: 2 }} />
                Edit
              </MenuItem>
            </Popover>
          </Box>
        </Stack>

        {isEmpty(description) ? (
          <Typography variant="body2" fontFamily="Wix Madefor Display">
            No description found
          </Typography>
        ) : (
          <Box maxHeight={50} sx={{ mb: 2 }}>
            <Typography textAlign="justify" fontFamily="Wix Madefor Display">
              {trimDescription(description)}
            </Typography>
          </Box>
        )}

        <Stack
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          direction="row"
          gap={1}
          mt="auto"
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Iconify icon="fa6-solid:image" />
            <Typography fontFamily="Wix Madefor Display">{images}</Typography>
          </Stack>
          <Stack ml="auto" direction="row" alignItems="center" gap={2}>
            <TaskActiveBadge isActive={isActive} />
            <StatusChip variant={status} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

TaskCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  images: PropTypes.number,
  status: PropTypes.oneOf(['created', 'assigned', 'in-progress', 'completed']),
  isActive: PropTypes.bool,
};

TaskCard.defaultProps = {
  description: '',
  images: 0,
  status: 'created',
  isActive: false,
};
