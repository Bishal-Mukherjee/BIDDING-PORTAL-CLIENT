import { uniqBy } from 'lodash';
import React, { useState } from 'react';

import { Grid, Card, Stack, Button, Divider, Typography, CardContent } from '@mui/material';

import { useTaskStore } from 'src/stores/admin';
import CompanySvg from 'src/assets/svgs/company.svg';
import { apiGetProfileByEmail } from 'src/firebase/firestore/commons';

import { BidsDetailedDialog } from 'src/components/admin';

export const TaskBids = () => {
  const { selectedTaskBids, selectedTask } = useTaskStore();

  const [open, setOpen] = useState(false);
  const [placedBids, setPlacedBids] = useState(false); // contains bid placed by a particular company
  const [companyInfo, setCompanyInfo] = useState({});
  const [clientInfo, setClientInfo] = useState({});

  const handleRowClick = async (row) => {
    const t = selectedTaskBids?.filter((s) => s.bidder.email === row.bidder.email);
    setPlacedBids(t);
    const companyResponse = await apiGetProfileByEmail({ email: row.bidder.email });
    setCompanyInfo(companyResponse);
    const clientResponse = await apiGetProfileByEmail({ email: selectedTask?.email });
    setClientInfo(clientResponse);
    setOpen(true);
  };

  const filteredData = uniqBy(selectedTaskBids, 'bidder.email');

  return (
    <>
      <Grid container spacing={2} justifyContent="center" flexWrap="wrap" mt={1}>
        <Grid item xs={12} md={6}>
          <Grid
            container
            spacing={2}
            justifyContent={{ md: 'flex-start', xs: 'center' }}
            flexWrap="wrap"
          >
            {filteredData?.map((bid) => (
              <Grid item md={4} xs={10}>
                <Card sx={{ width: '100%' }}>
                  <Stack direction="row" justifyContent="center">
                    <img src={bid?.bidder?.logo || CompanySvg} alt={bid?.bidder?.name} />
                  </Stack>
                  <Divider />
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {bid?.bidder?.name}
                    </Typography>
                    <Button onClick={() => handleRowClick(bid)} variant="outlined" fullWidth>
                      View
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <BidsDetailedDialog
        open={open}
        setOpen={setOpen}
        placedBids={placedBids}
        companyInfo={companyInfo}
        clientInfo={clientInfo}
      />
    </>
  );
};
