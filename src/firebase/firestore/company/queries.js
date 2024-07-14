import { doc, query, where, getDocs, updateDoc, collection } from 'firebase/firestore';

import { firestore } from 'src/firebase/config';

export const apiPostCompanyMetaInfo = async ({ email, searchLink, companyBio, logo }) => {
  try {
    const userRef = collection(firestore, 'users');
    const q = query(userRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error('User not found');
    }

    await updateDoc(doc(firestore, 'users', email), {
      metaInfo: {
        link: searchLink,
        bio: companyBio,
        logo: logo || 'https://trustallred.com/wp-content/uploads/2020/04/allred.webp',
        rating: 4.0, // TODO: get from backend
        reviews: 10, // TODO: get from backend
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
