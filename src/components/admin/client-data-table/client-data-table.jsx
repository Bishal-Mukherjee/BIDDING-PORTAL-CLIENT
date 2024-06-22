import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import {
  Box,
  Paper,
  Table,
  Tooltip,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
} from '@mui/material';

import { useAdminManagementStore } from 'src/stores/admin';

const formatAddress = (address) => {
  if (!address) {
    return {
      tooltipText: '-',
      cellValue: '-',
    };
  }
  return {
    tooltipText: `${address.street}, ${address.city}, ${address.state}`,
    cellValue: `${address.street}, ${address.city}`,
  };
};

export const ClientDataTable = ({ searchQuery }) => {
  const { clients } = useAdminManagementStore();

  const filteredData = useMemo(
    () =>
      clients?.filter(
        (task) =>
          searchQuery.regex &&
          (searchQuery.regex.test(task.firstName) ||
            searchQuery.regex.test(task.lastName) ||
            searchQuery.regex.test(task.email) ||
            searchQuery.regex.test(task.phoneNumber))
      ),
    [searchQuery, clients]
  );

  return (
    <Box sx={{ mx: { lg: 8 }, mt: 4, mb: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Phone Number</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((row) => (
              <TableRow
                key={row.phoneNumber}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.phoneNumber}
                </TableCell>
                <TableCell align="right">{row.firstName}</TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  <Tooltip title={formatAddress(row?.address).tooltipText}>
                    {formatAddress(row?.address).cellValue}
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

ClientDataTable.propTypes = {
  searchQuery: PropTypes.shape({
    regex: PropTypes.instanceOf(RegExp),
    value: PropTypes.string.isRequired,
  }).isRequired,
};
