import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Box,
  Card,
  Grid,
  Stack,
  Paper,
  Dialog,
  Divider,
  Typography,
  IconButton,
} from '@mui/material';

import { trimText } from 'src/utils';

import Iconify from 'src/components/iconify';
import { BidStatusChip } from 'src/components/commons';

import { BidConfirmationDialog } from '../bid-confirmation-dialog/bid-confirmation-dialog';

const BidCard = ({ bid }) => (
  <Card
    sx={{
      minWidth: 132,
      minHeight: 120,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 1,
      p: 1,
    }}
    component={Paper}
    elevation={2}
  >
    {isEmpty(bid?.attachment) ? (
      <Typography> - </Typography>
    ) : (
      <Stack direction="column" alignItems="center" gap={1}>
        <Link to={bid?.attachment} target="_blank" rel="noreferrer">
          <Iconify icon="fa-solid:file-invoice" color="#000000" />
        </Link>
        <Box sx={{ width: 20, height: 2, background: '#000', mt: -1.4 }} />
      </Stack>
    )}
    <Typography textTransform="uppercase" fontSize={14} mt={1}>
      {bid?.quality}
    </Typography>
    <Typography textTransform="uppercase" fontSize={12} mt={1}>
      {bid?.estimatedCompletionDays} days
    </Typography>
    <Typography textTransform="uppercase" fontSize={14} mb={1}>
      {bid?.currency}&nbsp;&nbsp;{bid?.amount}
    </Typography>
    {bid?.status !== 'pending' ? (
      <BidStatusChip variant={bid?.status} />
    ) : (
      <BidConfirmationDialog selectedBid={bid} />
    )}
  </Card>
);

export const BidsDetailedDialog = ({ open, setOpen, placedBids, companyInfo, clientInfo }) => (
  <Dialog open={open} maxWidth="" fullWidth>
    <Stack
      justifyContent="center"
      alignItems="flex-start"
      direction="column"
      width="100%"
      p={4}
      spacing={0}
    >
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" width="100%">
        <Stack alignItems="center" direction="row" gap={1}>
          <Typography>
            Customer Name:{' '}
            <b>
              {clientInfo?.firstName} {clientInfo?.lastName}
            </b>
          </Typography>
        </Stack>
        <IconButton>
          <Iconify icon="eva:close-fill" onClick={() => setOpen(false)} />
        </IconButton>
      </Stack>

      <Divider sx={{ width: '100%', my: 2 }} />

      <Stack direction="row" alignItems="center" justifyContent="center">
        <Box sx={{ width: { sm: '100%', md: '64%' } }}>
          <img src={companyInfo?.metaInfo?.logo} alt={companyInfo?.firstName} width="100%" />
        </Box>
      </Stack>

      <Typography>
        Company Name:{' '}
        <b>
          {companyInfo?.firstName} {companyInfo?.lastName}
        </b>
      </Typography>

      <Box sx={{ my: 1 }}>
        <Typography variant="body2">{trimText(companyInfo?.metaInfo?.bio, 300)}</Typography>
      </Box>

      <Stack direction="row" alignItems="center" gap={1}>
        <Iconify icon="mdi:internet" color="#000000" />
        <Link to={companyInfo?.metaInfo?.link} target="_blank" rel="noreferrer">
          Google Review
        </Link>
      </Stack>

      {!isEmpty(placedBids) && (
        <Grid container mt={2} gap={2}>
          {placedBids?.map((bid) => (
            <Grid item xs={5} md={3}>
              <BidCard bid={bid} />
            </Grid>
          ))}
        </Grid>
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
