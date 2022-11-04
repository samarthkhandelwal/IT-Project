import { useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, provider, db } from '../firebase-config';

const usersCollectionRef = collection(db, 'users');

const formatAuthUser = (user, id) => ({
  uid: id,
  name: user.name,
  email: user.email,
  photoURL: user.photo,
  role: user.role,
  favouriteWorkouts: user.favouriteWorkouts,
  favouriteExercises: user.favouriteExercises,
  createdWorkouts: user.createdWorkouts,
});

const createNewUser = async (user) => {
  await setDoc(doc(usersCollectionRef, user.uid), {
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
    role: 1,
    favouriteWorkouts: [],
    favouriteExercises: [],
    createdWorkouts: [],
  });
};

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (user) => {
    if (!user) {
      setAuthUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const docRef = doc(usersCollectionRef, user.uid);
    let userDoc = await getDoc(docRef);
    if (!userDoc.exists()) {
      createNewUser(user);
      userDoc = await getDoc(docRef);
    }
    const formattedUser = formatAuthUser(userDoc.data(), user.uid);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  // listen for Firebase state change

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const createUserEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signInGoogle = async () => {
    signInWithRedirect(auth, provider);
  };

  const signOutUser = () => signOut(auth).then(clear);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      authStateChanged(user);
    });
  }, []);

  return {
    authUser,
    loading,
    signInEmail,
    signInGoogle,
    createUserEmail,
    signOutUser,
  };
}
