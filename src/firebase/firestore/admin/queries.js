import { doc, query, where, setDoc, getDocs, collection } from 'firebase/firestore';

import { firestore } from 'src/firebase/config';

export const apiGetUsersByDesignation = async (designation = 'CLIENT') => {
  try {
    const usersRef = collection(firestore, 'users');
    const q = query(usersRef, where('designation', '==', designation));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error('User not found');
    }
    const users = querySnapshot.docs.map((d) => d.data());
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiAddClientDoc = async ({ email, firstName, lastName, phoneNumber }) => {
  try {
    await setDoc(doc(firestore, 'users', email), {
      firstName,
      lastName,
      phoneNumber,
      email,
      designation: 'CLIENT',
    });
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};
