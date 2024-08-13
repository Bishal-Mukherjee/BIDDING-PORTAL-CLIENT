import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import {
  Stack,
  Dialog,
  Button,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
} from '@mui/material';

import { apiGetUsersByDesignation } from 'src/firebase/firestore/admin';

import Iconify from 'src/components/iconify';

export const SuggestedBiddersDialog = ({ open = true, onClose, setSelectedBidders }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const handleGetCompanies = async () => {
    const response = await apiGetUsersByDesignation('COMPANY');
    const c = response.map((company) => ({
      label: company.firstName,
      value: company.email,
    }));
    setCompanies(c);
  };

  useEffect(() => {
    if (open) {
      handleGetCompanies();
    }
  }, [open]);

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <Stack
        justifyContent="flex-start"
        alignItems="flex-start"
        direction="column"
        width="100%"
        p={2}
        height={376}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
          <Typography variant="h5">Suggested Companies</Typography>
          <IconButton onClick={onClose}>
            <Iconify icon="mdi:close" />
          </IconButton>
        </Stack>

        <Autocomplete
          multiple
          value={selectedCompanies}
          onChange={(_event, newValue) => {
            setSelectedCompanies(newValue);
          }}
          options={companies}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Select Companies" />}
          sx={{ mt: 2 }}
          ListboxProps={{
            sx: {
              maxHeight: 152,
              border: 'solid 1px #adb5bd',
              borderTop: 0,
              borderRadius: 1,
            },
          }}
        />

        <Stack
          direction="row"
          width="100%"
          gap={1}
          justifyContent="flex-start"
          alignItems="center"
          mt={2}
        >
          <Iconify icon="ic:twotone-info" width={16} />
          <Typography variant="caption">
            This task will only be visible to the selected companies
          </Typography>
        </Stack>

        <Stack
          mt="auto"
          direction="row"
          width="100%"
          gap={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Button
            onClick={() => setSelectedBidders(selectedCompanies)}
            disabled={isEmpty(selectedCompanies)}
          >
            Save
          </Button>
          <Button onClick={() => setSelectedBidders([])} disabled={!isEmpty(selectedCompanies)}>
            Open to all
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

SuggestedBiddersDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setSelectedBidders: PropTypes.func,
};
