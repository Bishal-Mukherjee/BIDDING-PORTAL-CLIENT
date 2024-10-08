/* eslint-disable no-nested-ternary */
import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import {
  Box,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';

export const DataTable = ({ columns = [], rows = [] }) => (
  <Box sx={{ mx: { lg: 8 }, mt: 4, mb: 2 }}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        {!isEmpty(columns) && (
          <TableHead>
            {columns?.map((column) => (
              <TableCell key={`column-${column.label}`} align={column.align || 'left'}>
                {column.label}
              </TableCell>
            ))}
          </TableHead>
        )}

        {!isEmpty(rows) ? (
          <TableBody>
            {rows?.map((row) => (
              <TableRow
                key={row.phoneNumber}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {columns?.map((column) => (
                  <TableCell key={`column-${column.label}`} align={column.align || 'left'}>
                    {row[column.key] ? (
                      <>{row[column.key]}</>
                    ) : column.key === 'action' ? (
                      <>{column.component(row)}</>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <Typography p={1}>No data</Typography>
        )}
      </Table>
    </TableContainer>
  </Box>
);

DataTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
};
