import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Box, Card, Stack, Paper, Dialog, Divider, Typography, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';

const BidCard = ({ bid }) => (
  <Card
    sx={{
      minWidth: 120,
      minHeight: 120,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 1,
    }}
    component={Paper}
    elevation={2}
  >
    {isEmpty(bid?.attachment) ? (
      <Typography> - </Typography>
    ) : (
      <a href={bid?.attachment} target="_blank" rel="noreferrer">
        <Iconify icon="fa-solid:file-invoice" color="#000000" />
      </a>
    )}
    <Typography textTransform="uppercase" fontSize={14} mt={1}>
      {bid?.quality}
    </Typography>
    <Typography textTransform="uppercase" fontSize={14}>
      {bid?.currency}&nbsp;&nbsp;{bid?.amount}
    </Typography>
  </Card>
);

export const BidsDetailedDialog = ({ open, setOpen, placedBids, companyInfo, clientInfo }) => (
  <Dialog open={open} maxWidth="sm" fullWidth>
    <Stack
      justifyContent="center"
      alignItems="flex-start"
      direction="column"
      width="100%"
      p={4}
      spacing={0}
    >
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" width="100%">
        <Box>
          <Typography variant="h5">
            {clientInfo?.firstName} {clientInfo?.lastName}
          </Typography>
          <Typography color="#6c757d" variant="subtitle2">
            {clientInfo?.email}
          </Typography>
        </Box>
        <IconButton>
          <Iconify icon="eva:close-fill" onClick={() => setOpen(false)} />
        </IconButton>
      </Stack>

      <Divider sx={{ width: '100%', my: 2 }} />

      <Stack direction="row" alignItems="center">
        <img src={companyInfo?.metaInfo?.logo} alt={companyInfo?.firstName} />
      </Stack>

      <Typography variant="h5" component={Link} to={companyInfo?.metaInfo?.link} target="_blank">
        {companyInfo?.firstName} {companyInfo?.lastName}
      </Typography>
      <Typography color="#6c757d" variant="subtitle2">
        {companyInfo?.email}
      </Typography>

      {!isEmpty(placedBids) && (
        <Stack direction="row" gap={2} alignItems="center" justifyContent="flex-start" mt={2}>
          {placedBids?.map((bid) => (
            <BidCard bid={bid} />
          ))}
        </Stack>
      )}
    </Stack>
  </Dialog>
);

BidsDetailedDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  placedBids: PropTypes.array.isRequired,
  companyInfo: PropTypes.object.isRequired,
  clientInfo: PropTypes.object.isRequired,
};

BidCard.propTypes = {
  bid: PropTypes.object.isRequired,
};
