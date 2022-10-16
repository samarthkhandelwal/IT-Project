// React
import React, { createContext, useContext } from 'react';

// Firebase
import useFirebaseAuth from '../lib/useFirebaseAuth';

// Create user context
const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInEmail: async () => {},
  signInGoogle: async () => {},
  createUserEmail: async () => {},
  signOutUser: async () => {},
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);
