import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Box, Stack, Drawer, Rating, Typography, IconButton } from '@mui/material';

import NoImageSvg from 'src/assets/svgs/no-image.svg';

import Iconify from 'src/components/iconify';

export const CompanyDetailsDialog = ({ open, setOpen, companyDetails }) => {
  const name = `${companyDetails?.firstName} ${companyDetails?.lastName}` || '';
  const email = companyDetails?.email || '';
  const bio = companyDetails?.metaInfo?.bio || '';
  const logo = companyDetails?.metaInfo?.logo || '';
  const rating = companyDetails?.metaInfo?.rating || '';
  const reviews = companyDetails?.metaInfo?.reviews || '';
  const companyWebsite = companyDetails?.companyWebsite || '';
  const reviewLink = companyDetails?.metaInfo?.link || '';

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <Box sx={{ minWidth: { lg: 400, sm: 360, xs: 360 }, m: 1, height: '100%', maxWidth: 408 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2}>
          <Typography variant="h4" fontFamily="Poppins">
            Company Details
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Iconify icon="mdi:close" />
          </IconButton>
        </Stack>

        <Stack mt={1} p={1} direction="column">
          <img src={logo || NoImageSvg} alt={name} style={{ width: 400, height: 200 }} />

          <Typography variant="h5">{name}</Typography>

          <Stack direction="row" justifyContent="flex-start" alignItems="center">
            <Iconify icon="mdi:email" />
            <Typography variant="subtitle2" color="#6c757d">
              {email}
            </Typography>
          </Stack>

          {companyWebsite && (
            <Stack direction="row" justifyContent="flex-start" alignItems="center">
              <Iconify icon="mdi:internet" />
              <Typography variant="subtitle2" color="#6c757d">
                {email}
              </Typography>
            </Stack>
          )}

          <Typography variant="subtitle2" color="#6c757d" mt={2}>
            {bio}
          </Typography>

          <Stack mt={8} direction="column" justifyContent="flex-start" alignItems="flex-start">
            {rating && reviews && (
              <>
                <Rating name="read-only" value={rating} precision={0.5} readOnly size="medium" />
                <Typography variant="subtitle2" color="#6c757d">
                  {reviews} reviews
                </Typography>
              </>
            )}

            {companyWebsite && (
              <Typography
                variant="subtitle2"
                color="#6c757d"
                component={Link}
                to={reviewLink}
                target="_blank"
              >
                {reviewLink}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};

CompanyDetailsDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  companyDetails: PropTypes.object,
};
