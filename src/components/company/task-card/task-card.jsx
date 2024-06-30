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
import { Popover, StatusChip } from 'src/components/commons';

const BID_WIDNOW_EXPIRY = 72; // need to place a bid within 72 hours

export const TaskCard = ({
  id,
  title,
  description,
  previewImage,
  createdAt,
  status,
  activationDate,
  hideTaskExpiry,
  hasAcceptedTasks,
}) => {
  const navigate = useNavigate();

  const activationTime = dayjs(activationDate);
  const remainingTime = dayjs().diff(activationTime, 'hours');

  const BID_EXPIRES_IN = BID_WIDNOW_EXPIRY - remainingTime;

  const handleViewClick = () => {
    navigate(`/company/analytics/${id}`, { state: { mode: 'view' } });
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

      <Stack
        direction="row"
        alignItems="center"
        justifyContent={hideTaskExpiry ? 'flex-end' : 'space-between'}
        position="absolute"
        top={10}
        width="95%"
      >
        {!hideTaskExpiry && (
          <Stack direction="row" alignItems="center" gap={1}>
            <Iconify icon="clarity:clock-solid" />
            {BID_EXPIRES_IN <= 0 ? (
              <Typography variant="subtitle2" color="red">
                Bidding expired
              </Typography>
            ) : (
              <Typography variant="subtitle2" color="red">
                Expires in {BID_EXPIRES_IN} hours
              </Typography>
            )}
          </Stack>
        )}
        <StatusChip variant={status} />
      </Stack>

      <Stack
        spacing={1}
        sx={{ pb: 0, px: 1, mt: 1 }}
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        direction="row"
      >
        <Stack direction="row" gap={1} alignItems="center" width="100%">
          <Iconify icon="mingcute:task-2-fill" width={28} />
          <Stack
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            width="100%"
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              height={24}
            >
              <Typography
                sx={{ color: '#000000' }}
                underline="hover"
                variant="subtitle2"
                noWrap
                textAlign="start"
              >
                {trimText(title, 32)}
              </Typography>

              {(BID_EXPIRES_IN > 0 || status === 'assigned') && (
                <Box ml="auto">
                  <Popover>
                    <MenuItem onClick={handleViewClick} disableTouchRipple>
                      <Iconify icon="mdi:eye" sx={{ mr: 1 }} />
                      View
                    </MenuItem>
                  </Popover>
                </Box>
              )}
            </Stack>

            <Typography
              variant="caption"
              sx={{ color: (theme) => alpha(theme.palette.text.secondary, 0.8) }}
            >
              {dayjs(createdAt).format('DD MMM YYYY')}
            </Typography>
          </Stack>
        </Stack>
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
  description: PropTypes.string,
  status: PropTypes.oneOf(['created', 'assigned', 'in-progress', 'completed']),
  activationDate: PropTypes.string,
  hideTaskExpiry: PropTypes.bool,
  hasAcceptedTasks: PropTypes.bool,
  previewImage: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
};

TaskCard.defaultProps = {
  description: '',
  status: 'created',
  previewImage: '',
  createdAt: new Date(),
};
