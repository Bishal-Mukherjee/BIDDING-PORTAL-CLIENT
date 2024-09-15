import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
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

import { wrapDescriptionText } from 'src/utils';

import Iconify from 'src/components/iconify';
import { StatusChip } from 'src/components/commons';

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
      {bid?.estimatedCompletionDays} {bid?.estimatedCompletionDays === 1 ? 'day' : 'days'}
    </Typography>
    <Typography textTransform="uppercase" fontSize={14} mb={1}>
      {bid?.currency}&nbsp;&nbsp;{bid?.amount}
    </Typography>
    {bid?.status !== 'pending' ? (
      <Box sx={{ mt: 1 }}>
        <StatusChip variant={bid?.status} />
      </Box>
    ) : (
      <Box sx={{ mt: 1 }}>
        <BidConfirmationDialog selectedBid={bid} />
      </Box>
    )}
  </Card>
);

export const BidsDetailedDialog = ({ open, setOpen, placedBids, companyInfo, clientInfo }) => {
  const isUnspacedDescription = useMemo(() => {
    if (!isEmpty(companyInfo?.metaInfo?.bio)) {
      if (!companyInfo?.metaInfo?.bio.includes(' ')) {
        return true;
      }
    }
    return false;
  }, [companyInfo?.metaInfo?.bio]);

  return (
    <Dialog open={open} maxWidth="lg" fullWidth>
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

        <Stack direction="row" alignItems="center" justifyContent="center" width="100%">
          <img src={companyInfo?.metaInfo?.logo} alt={companyInfo?.firstName} width={240} />
        </Stack>

        <Typography>
          Company Name:{' '}
          <b>
            {companyInfo?.firstName} {companyInfo?.lastName}
          </b>
        </Typography>

        {isUnspacedDescription ? (
          <Typography variant="body2" color="text.secondary" width="100%" my={1}>
            {wrapDescriptionText(companyInfo?.metaInfo?.bio, 144)}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary" width="100%" noWrap my={1}>
            {companyInfo?.metaInfo?.bio}
          </Typography>
        )}

        <Stack direction="row" alignItems="center" gap={1}>
          <Iconify icon="mdi:internet" color="#000000" />
          <Link to={companyInfo?.metaInfo?.link} target="_blank" rel="noreferrer">
            Google Review
          </Link>
        </Stack>

        {!isEmpty(placedBids) && (
          <Grid container mt={2} gap={4} justifyContent="center" alignItems="center">
            {placedBids?.map((bid) => (
              <Grid item xs={5} md={2}>
                <BidCard bid={bid} />
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Dialog>
  );
};

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
