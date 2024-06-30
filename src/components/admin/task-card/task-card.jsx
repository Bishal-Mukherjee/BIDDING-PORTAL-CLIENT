/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { alpha } from '@mui/material/styles';
import { Box, Stack, MenuItem, Typography } from '@mui/material';

import { trimText } from 'src/utils';
import NoImageSvg from 'src/assets/svgs/no-image.svg';

import Iconify from 'src/components/iconify';
import { Popover, StatusChip, TaskActiveBadge } from 'src/components/commons';

export const TaskCard = ({
  id,
  name,
  title,
  description,
  previewImage,
  status,
  isActive,
  createdAt,
}) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/admin/analytics/${id}`, { state: { mode: 'view' } });
  };

  const handleEditClick = () => {
    navigate(`/admin/analytics/${id}`, { state: { mode: 'edit' } });
  };

  return (
    <Box sx={{ bgcolor: (theme) => alpha(theme.palette.background.paper, 0) }}>
      <img
        src={previewImage || NoImageSvg}
        alt="attachment_img"
        style={{
          height: 150,
          objectFit: previewImage ? 'cover' : 'contain',
          width: '100%',
          scale: '0.8',
          top: 0,
        }}
      />

      <Box position="absolute" top={10} right={10}>
        <StatusChip variant={status} />
      </Box>

      <Stack
        spacing={1}
        sx={{ pb: 0, px: 1, mt: 1 }}
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        direction="row"
      >
        <Stack direction="row" gap={1} alignItems="center">
          <Iconify icon="solar:user-bold-duotone" width={28} />
          <Stack direction="column" alignItems="flex-start">
            <Typography sx={{ color: '#000000' }} underline="hover" variant="subtitle2" noWrap>
              {name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: (theme) => alpha(theme.palette.text.secondary, 0.8) }}
            >
              {dayjs(createdAt).format('DD MMM YYYY')}
            </Typography>
          </Stack>
        </Stack>

        <Box ml="auto">
          <Popover>
            <MenuItem onClick={handleViewClick} disableTouchRipple>
              <Iconify icon="mdi:eye" sx={{ mr: 1 }} />
              View
            </MenuItem>
            <MenuItem onClick={handleEditClick} disableTouchRipple disabled={isActive}>
              <Iconify icon="solar:pen-bold" sx={{ mr: 1 }} />
              Edit
            </MenuItem>
          </Popover>
        </Box>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        sx={{ px: 1, mt: 2, pr: 3 }}
        spacing={1}
      >
        <Typography
          sx={{ color: '#000000' }}
          underline="hover"
          variant="subtitle2"
          noWrap
          textAlign="start"
        >
          {title}
        </Typography>
        <TaskActiveBadge isActive={isActive} />
      </Stack>

      <Box sx={{ px: 1, mt: 1, textAlign: 'left' }}>
        {isEmpty(description) ? (
          <Typography variant="body2">No description found</Typography>
        ) : (
          <Typography textAlign="justify" variant="body2">
            {trimText(description)}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

TaskCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  previewImage: PropTypes.string,
  status: PropTypes.oneOf(['created', 'assigned', 'in-progress', 'completed']),
  isActive: PropTypes.bool,
  createdAt: PropTypes.instanceOf(Date),
};

TaskCard.defaultProps = {
  description: '',
  previewImage: '',
  status: 'created',
  isActive: false,
  createdAt: new Date(),
};
