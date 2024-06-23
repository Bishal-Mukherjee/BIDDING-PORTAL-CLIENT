/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useMemo, useState, useEffect, useContext, createContext } from 'react';

import { setAccessToken } from 'src/utils';
import { auth, firestore } from 'src/firebase/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const initializeUser = async (currentUser) => {
    if (currentUser) {
      const document = await getDoc(doc(firestore, 'users', currentUser.email));
      setUser(document.data());
      setIsEmailVerified(currentUser.emailVerified);
      setAccessToken('accessToken', currentUser.accessToken);
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({ user, setUser, loading, isEmailVerified, isLoggedIn }),
    [user, loading, isEmailVerified, isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
