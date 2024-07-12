import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { Box } from '@mui/material';

import { trimText } from 'src/utils';
import { useAdminManagementStore } from 'src/stores/admin';

import { DataTable } from 'src/components/commons';

export const ClientDataTable = ({ searchQuery, columns }) => {
  const { clients } = useAdminManagementStore();

  const rows = useMemo(
    () =>
      clients
        ?.filter(
          (task) =>
            searchQuery.regex &&
            (searchQuery.regex.test(task.firstName) ||
              searchQuery.regex.test(task.lastName) ||
              searchQuery.regex.test(task.email) ||
              searchQuery.regex.test(task.phoneNumber))
        )
        .map((row) => ({
          phoneNumber: row.phoneNumber,
          firstName: row.firstName,
          lastName: row.lastName,
          email: row.email,
          address: isEmpty(row?.address) ? '' : `${row?.address?.street}, ${row?.address?.city}`,
          message: isEmpty(row?.message) ? '' : trimText(row?.message, 50),
        })),
    [searchQuery, clients]
  );

  return (
    <Box sx={{ mx: { lg: 0 }, mt: 4, mb: 2 }}>
      <DataTable columns={columns} rows={rows} />
    </Box>
  );
};

ClientDataTable.propTypes = {
  searchQuery: PropTypes.shape({
    regex: PropTypes.instanceOf(RegExp),
    value: PropTypes.string.isRequired,
  }).isRequired,
  columns: PropTypes.array.isRequired,
};
