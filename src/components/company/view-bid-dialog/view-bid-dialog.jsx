import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';

import {
  Table,
  Paper,
  Stack,
  Dialog,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';

import { useTaskStore } from 'src/stores/company';

import Iconify from 'src/components/iconify';

export const ViewBidDialog = () => {
  const { selectedTask } = useTaskStore();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack direction="column" m={0} alignItems="flex-end">
        <Button onClick={handleOpen} variant="contained" color="inherit">
          Your Bids
        </Button>
      </Stack>

      <Dialog open={open} maxWidth="sm" fullWidth onClose={handleClose}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Placed On</TableCell>
                <TableCell align="right">Attachment</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedTask?.bids?.map((bid) => (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {bid?.id}
                  </TableCell>
                  <TableCell align="right">{bid?.amount}</TableCell>
                  <TableCell align="right">{dayjs(bid?.createdAt).format('DD MMM YYYY')}</TableCell>
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
                    <Typography textTransform="uppercase" fontSize={14}>
                      {bid?.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </>
  );
};
