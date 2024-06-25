import React from 'react';
import { isEmpty } from 'lodash';

import { Box, Grid, Stack, Paper, styled, Typography } from '@mui/material';

import { useTaskStore } from 'src/stores/admin';

import Iconify from 'src/components/iconify';
import { BidStatusChip } from 'src/components/commons';

import { BidConfirmationDialog } from '../../../components/admin';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 5,
}));

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
              <Grid container spacing={1} mt={1}>
                {selectedTaskBids?.map((bid) => (
                  <Grid item xs={12} md={12} key={bid.id} px={{ md: 0, sm: 1, xs: 1 }}>
                    <Item elevation={2} p={4} sx={{ height: '100%' }}>
                      <Stack
                        width="100%"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        height="100%"
                        gap={1}
                        direction="row"
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          width="33%"
                          height="100%"
                          gap={1}
                        >
                          <Stack
                            height="100%"
                            direction="row"
                            alignItems="center"
                            display={{ sm: 'none', xs: 'none', md: 'flex' }}
                          >
                            <Iconify icon="mdi:company" width={24} />
                          </Stack>

                          <Typography variant="subtitle1">{bid?.bidder?.name}</Typography>
                        </Stack>

                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                          gap={1}
                          width="33%"
                          height="100%"
                        >
                          <Typography fontSize={14} variant="subtitle2">
                            {bid?.currency}&nbsp;&nbsp;
                            {bid?.amount}
                          </Typography>
                        </Stack>

                        <Stack width="33%" height="100%">
                          <Box sx={{ ml: 'auto' }}>
                            {bid?.status === 'pending' ? (
                              <BidConfirmationDialog selectedBid={bid} />
                            ) : (
                              <BidStatusChip variant={bid?.status} />
                            )}
                          </Box>
                        </Stack>
                      </Stack>
                    </Item>
                  </Grid>
                ))}
              </Grid>
            )}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};
