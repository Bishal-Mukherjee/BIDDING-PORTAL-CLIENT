import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import {
  Box,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
} from '@mui/material';

import { useAdminManagementStore } from 'src/stores/admin';

export const CompanyDataTable = ({ searchQuery }) => {
  const { companies } = useAdminManagementStore();

  const filteredData = useMemo(
    () =>
      companies?.filter(
        (task) =>
          searchQuery.regex &&
          (searchQuery.regex.test(task.firstName) ||
            searchQuery.regex.test(task.lastName) ||
            searchQuery.regex.test(task.email))
      ),
    [searchQuery, companies]
  );

  return (
    <Box sx={{ mx: { lg: 8 }, mt: 4, mb: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((row) => (
              <TableRow key={row.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell align="right">{row.firstName}</TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

CompanyDataTable.propTypes = {
  searchQuery: PropTypes.shape({
    regex: PropTypes.instanceOf(RegExp),
    value: PropTypes.string.isRequired,
  }).isRequired,
};
