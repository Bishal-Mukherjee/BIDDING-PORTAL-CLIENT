import { useState, useEffect } from 'react';

import { Box, Stack, Alert, Dialog, Button, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

import { AddressDetails } from './address-details';
import { PersonalDetails } from './personal-details';

export const AddClientDialog = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const [showAlert, setShowAlert] = useState({
    variant: '',
    content: '',
  });

  useEffect(() => {
    setTimeout(() => {
      setShowAlert({ variant: '', content: '' });
    }, 4000);
  }, [showAlert]);

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => setOpen(true)}
        startIcon={<Iconify icon="icons8:plus" />}
      >
        Add Client
      </Button>

      <Dialog open={open} maxWidth="sm" fullWidth>
        <Stack
          direction="column"
          width="100%"
          gap={2}
          justifyContent="center"
          alignItems="center"
          p={2}
        >
          <Stack direction="column" alignItems="center" gap={2} width="100%">
            <Typography variant="h5">Add New Client</Typography>

            {showAlert.content && (
              <Alert
                sx={{ width: '100%', fontFamily: 'Wix Madefor Display', fontWeight: 600 }}
                severity={showAlert.variant}
              >
                {showAlert.content}
              </Alert>
            )}

            {tab === 0 && (
              <PersonalDetails
                userDetails={userDetails}
                setUserDetails={setUserDetails}
                setTab={setTab}
                setOpen={setOpen}
                setShowAlert={setShowAlert}
              />
            )}

            {tab === 1 && (
              <AddressDetails
                userDetails={userDetails}
                setUserDetails={setUserDetails}
                setTab={setTab}
                setShowAlert={setShowAlert}
              />
            )}
          </Stack>
        </Stack>
      </Dialog>
    </Box>
  );
};
