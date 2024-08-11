import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { alpha } from '@mui/material/styles';
import {
  Grid,
  Card,
  Stack,
  Dialog,
  styled,
  IconButton,
  Typography,
  DialogContent,
} from '@mui/material';

import Iconify from 'src/components/iconify';

import { ImageViewer } from '../attachment-viewer';

const Item = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  bgcolor: alpha(theme.palette.grey[900], 0.72),
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 5,
}));

const AttachmentSliderDialog = ({ images, open, setIsOpen, selectedImageIndex }) => {
  const [imageIndex, setImageIndex] = useState(selectedImageIndex || 0);

  const handleClose = () => setIsOpen(false);

  const handleNext = () => {
    if (imageIndex === images.length - 1) {
      setImageIndex(0);
    } else {
      setImageIndex(imageIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (imageIndex === 0) {
      setImageIndex(images.length - 1);
    } else {
      setImageIndex(imageIndex - 1);
    }
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
      <DialogContent>
        <Stack direction="row" alignItems="center" justifyContent="center" gap={2}>
          <IconButton
            sx={{ position: 'absolute', left: 2 }}
            onClick={handlePrevious}
            disabled={imageIndex === 0}
          >
            <Iconify
              icon="ep:arrow-left-bold"
              width={32}
              color={imageIndex === 0 ? '#CED4DA' : '#000000'}
            />
          </IconButton>

          <img
            src={images[imageIndex]}
            alt=""
            width="100%"
            style={{ minHeight: 480, maxHeight: 480 }}
          />

          <IconButton
            sx={{ position: 'absolute', right: 2 }}
            onClick={handleNext}
            disabled={imageIndex === images.length - 1}
          >
            <Iconify
              icon="ep:arrow-right-bold"
              width={32}
              color={imageIndex === images.length - 1 ? '#CED4DA' : '#000000'}
            />
          </IconButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export const AttachmentList = ({ images, onDelete, hideDeleteIcon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImgClick = (index) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      {isEmpty(images) ? (
        <Typography color="text.secondary" variant="body2" sx={{ textAlign: 'flex-start' }}>
          No attachments
        </Typography>
      ) : (
        <Grid container spacing={2} flexWrap="wrap" mt={1}>
          {images?.map((image, index) => (
            <Grid item md={4} sm={12} xs={12} key={image}>
              <Item elevation={0} py={4} px={4}>
                <ImageViewer
                  imageURL={image}
                  onDelete={() => onDelete(index)}
                  hideDeleteIcon={hideDeleteIcon}
                  onClick={() => handleImgClick(images.indexOf(image))}
                />
              </Item>
            </Grid>
          ))}
        </Grid>
      )}

      {isOpen && (
        <AttachmentSliderDialog
          images={images}
          open={isOpen}
          setIsOpen={setIsOpen}
          selectedImageIndex={selectedImageIndex}
        />
      )}
    </>
  );
};

AttachmentList.propTypes = {
  images: PropTypes.array,
  onDelete: PropTypes.func,
  hideDeleteIcon: PropTypes.bool,
};

AttachmentList.defaultProps = {
  images: [],
  onDelete: () => {},
  hideDeleteIcon: true,
};

AttachmentSliderDialog.propTypes = {
  images: PropTypes.array,
  open: PropTypes.bool,
  setIsOpen: PropTypes.func,
  selectedImageIndex: PropTypes.number,
};
