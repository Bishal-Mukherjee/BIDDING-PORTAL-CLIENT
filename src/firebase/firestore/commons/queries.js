import { query, where, getDocs, collection } from 'firebase/firestore';

import { firestore } from 'src/firebase/config';

export const apiGetProfileByEmail = async ({ email }) => {
  try {
    const userRef = collection(firestore, 'users');
    const q = query(userRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error('User not found');
    }

    const user = querySnapshot.docs[0].data();
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
