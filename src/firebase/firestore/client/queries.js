/* eslint-disable import/no-extraneous-dependencies */

import { query, where, getDocs, updateDoc, collection } from 'firebase/firestore';

import { database } from 'src/firebase/config';

export const apiUpdateUserAddress = async ({ email, address }) => {
  try {
    const usersRef = collection(database, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error('User not found.');
    }
    const userDoc = querySnapshot.docs[0];
    await updateDoc(userDoc.ref, { address });
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
