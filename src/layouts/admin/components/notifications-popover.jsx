import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { useMemo, useState, useEffect } from 'react';

import {
  Box,
  List,
  Badge,
  Avatar,
  Divider,
  Tooltip,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';

import { database } from 'src/firebase/config';
import { apiPutMarkNotificationAsRead } from 'src/firebase/database';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

function formatTimestamp(timestamp) {
  const now = dayjs();
  const created = dayjs(timestamp);
  const diffDays = created.diff(now, 'days');

  if (diffDays === 0) {
    return created.format('h:mm A');
  }
  if (diffDays < 7) {
    return `${diffDays} days ago`;
  }
  return created.format('MMM DD, YYYY');
}

export const NotificationsPopover = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const recentNotifications = useMemo(
    () =>
      notifications
        ?.filter((item) => dayjs(item.createdAt).diff(dayjs(), 'day') <= 2)
        ?.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)),
    [notifications]
  );

  const oldNotifications = useMemo(
    () =>
      notifications
        ?.filter((item) => dayjs(item.createdAt).diff(dayjs(), 'day') > 2)
        ?.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)),
    [notifications]
  );

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  //   const handleMarkAllAsRead = () => {
  //     setNotifications(
  //       notifications.map((notification) => ({
  //         ...notification,
  //         isUnRead: false,
  //       }))
  //     );
  //   };

  const handleRedirection = (notification) => {
    navigate(`/admin/analytics/${notification.resourceId}`, {
      state: { resourceType: notification.resourceType },
    });
  };

  const handleMarkAsRead = (event, id) => {
    event.stopPropagation();
    apiPutMarkNotificationAsRead(id);
  };

  useEffect(() => {
    onValue(ref(database), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const n = Object.values(data).map((d) => d);
        setNotifications(n);
      }
    });
  }, []);

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" color="#ffffff" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {/* {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )} */}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {notifications?.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              No notifications
            </Typography>
          </Box>
        ) : (
          <Scrollbar sx={{ minHeight: 200, maxHeight: 400 }}>
            {recentNotifications?.length > 0 && (
              <List
                disablePadding
                subheader={
                  <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                    New
                  </ListSubheader>
                }
              >
                {recentNotifications?.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={() => handleRedirection(notification)}
                    onMarkAsRead={(e) => handleMarkAsRead(e, notification.id)}
                  />
                ))}
              </List>
            )}

            {oldNotifications?.length > 0 && (
              <List
                disablePadding
                subheader={
                  <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                    Before that
                  </ListSubheader>
                }
              >
                {oldNotifications?.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </List>
            )}
          </Scrollbar>
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box> */}
      </Popover>
    </>
  );
};

// ----------------------------------------------------------------------

function NotificationItem({ notification, onClick, onMarkAsRead }) {
  const { avatar, title } = renderContent(notification);
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
      onClick={onClick}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {formatTimestamp(notification.createdAt)}
          </Typography>
        }
      />
      {notification.isUnRead && (
        <Tooltip title="Mark as read">
          <IconButton onClick={onMarkAsRead}>
            <Iconify icon="solar:check-circle-bold-duotone" />
          </IconButton>
        </Tooltip>
      )}
    </ListItemButton>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
  onClick: PropTypes.func,
  onMarkAsRead: PropTypes.func,
};

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp;{notification.description}
      </Typography>
    </Typography>
  );

  if (notification.type === 'task_created') {
    return {
      avatar: <Iconify icon="majesticons:tickets" color="#343a40" />,
      title,
    };
  }
  if (notification.type === 'task_updated') {
    return {
      avatar: <Iconify icon="majesticons:tickets" color="#343a40" />,
      title,
    };
  }
  if (notification.type === 'bid_placed') {
    return {
      avatar: <Iconify icon="pepicons-pencil:raise-hand-circle-filled" color="#343a40" />,
      title,
    };
  }
  return {
    avatar: <Iconify icon="solar:bell-bing-bold-duotone" color="#343a40" />,
    title,
  };
}
