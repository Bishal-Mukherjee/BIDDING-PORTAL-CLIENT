import React from 'react';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';

import {
  Grid,
  Stack,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';

import { useTaskStore } from 'src/stores/admin';

import Iconify from 'src/components/iconify';
import { BidStatusChip } from 'src/components/commons';

import { BidConfirmationDialog } from '../../../components/admin';

export const TaskBids = () => {
  const { selectedTaskBids } = useTaskStore();
  return (
    <Grid container spacing={2} justifyContent="center" flexWrap="wrap">
      <Grid item xs={12} md={6}>
        <Stack direction="row" width="100%" height="100%" spacing={2} mt={2}>
          <Stack direction="column" alignItems="center" width="100%" height="100%">
            {isEmpty(selectedTaskBids) ? (
              <Typography sx={{ mt: 0 }} variant="subtitle1">
                No bids found
              </Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Bidder</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Placed On</TableCell>
                      <TableCell align="right">Attachment</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedTaskBids?.map((bid) => (
                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {bid?.bidder?.name}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: 12 }}>
                          {bid?.currency}&nbsp;&nbsp;{bid?.amount}
                        </TableCell>
                        <TableCell align="right">
                          {dayjs(bid?.createdAt).format('DD MMM YYYY')}
                        </TableCell>
                        <TableCell align="center">
                          {isEmpty(bid?.attachment) ? (
                            <Typography> - </Typography>
                          ) : (
                            <a href={bid?.attachment} target="_blank" rel="noreferrer">
                              <Iconify icon="fa-solid:file-invoice" color="#000000" />
                            </a>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <BidStatusChip variant={bid?.status} />
                        </TableCell>
                        <TableCell align="right">
                          <BidConfirmationDialog selectedBid={bid} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};
