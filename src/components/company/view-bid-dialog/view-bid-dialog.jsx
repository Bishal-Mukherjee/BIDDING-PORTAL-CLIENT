import dayjs from 'dayjs';
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
          Your Bid
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
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {selectedTask?.bid?.id}
                </TableCell>
                <TableCell align="right">{selectedTask?.bid?.amount}</TableCell>
                <TableCell align="right">
                  {dayjs(selectedTask?.bid?.createdAt).format('DD MMM YYYY')}
                </TableCell>
                <TableCell align="right">
                  <Typography textTransform="uppercase" fontSize={14}>
                    {selectedTask?.bid?.status}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </>
  );
};
