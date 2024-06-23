import { ref, get, update } from 'firebase/database';

import { database } from 'src/firebase/config';

export const apiPutMarkNotificationAsRead = (id) => {
  try {
    const notificationRef = ref(database, `/${id}`);
    get(notificationRef).then((snapshot) => {
      if (snapshot.exists()) {
        const notification = snapshot.val();
        update(notificationRef, {
          ...notification,
          isUnRead: false,
        });
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};
