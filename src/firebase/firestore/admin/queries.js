import { doc, query, where, setDoc, getDocs, deleteDoc, collection } from 'firebase/firestore';

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

export const apiGetClient = async ({ phoneNumber }) => {
  try {
    const usersRef = collection(firestore, 'users');
    const q = query(usersRef, where('phoneNumber', '==', phoneNumber));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error('User not found');
    }
    const users = querySnapshot?.docs?.map((d) => d.data())[0];
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiDeleteClient = async ({ email }) => {
  try {
    const usersRef = collection(firestore, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('User not found');
    }

    const userDoc = querySnapshot.docs[0];

    await deleteDoc(userDoc.ref);
  } catch (error) {
    console.error('Error deleting client document: ', error);
    throw error;
  }
};
