/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Box, Stack, Divider, MenuItem, Typography } from '@mui/material';

import { trimDescription } from 'src/utils';

import Iconify from 'src/components/iconify';
import { Popover, StatusChip } from 'src/components/commons';

const BID_WIDNOW_EXPIRY = 72; // need to place a bid within 72 hours

export const TaskCard = ({
  id,
  title,
  description,
  images,
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
    <Box width="100%" height="100%">
      <Stack gap={1} px={1} width="100%" height="100%" direction="column">
        <Stack width="100%" direction="row" gap={1} alignItems="center">
          <Stack alignItems="center" justifyContent="center" width={16}>
            <Iconify icon="mingcute:task-2-fill" width={24} />
          </Stack>
          <Typography fontFamily="Wix Madefor Display" fontSize={14} textAlign="left">
            {title}
          </Typography>

          {BID_EXPIRES_IN > 0 && (
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
              </Popover>
            </Box>
          )}
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
            <StatusChip variant={status} />
          </Stack>
        </Stack>

        {!hideTaskExpiry && (
          <>
            <Divider my={1} />
            <Stack direction="row" alignItems="center" gap={1}>
              <Iconify icon="clarity:clock-solid" />

              {BID_EXPIRES_IN <= 0 ? (
                <Typography>Bidding has expired for this task</Typography>
              ) : (
                <Typography fontFamily="Wix Madefor Display">
                  Bidding ends in {BID_EXPIRES_IN} hours
                </Typography>
              )}
            </Stack>
          </>
        )}
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
  activationDate: PropTypes.string,
  hideTaskExpiry: PropTypes.bool,
  hasAcceptedTasks: PropTypes.bool,
};

TaskCard.defaultProps = {
  description: '',
  images: 0,
  status: 'created',
};
