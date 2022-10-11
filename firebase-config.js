// import firebase SDK
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  getDoc,
  doc,
  collection,
  setDoc,
} from 'firebase/firestore';
import { getAuth, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

// store configuration details
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
const usersCollectionRef = collection(db, 'users');

// Firebase features
export const signInWithGoogle = async () => {
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
    .then(async (result) => {
      // This gives you a Google Access Token.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(result);

      // The signed-in user info.
      const user = result.user;
      const docRef = doc(db, usersCollectionRef, user.uid);
      const userDoc = await getDoc(docRef);
      if (!userDoc.exists()) {
        createNewUser(user);
      }
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      // The email of the user's account used.
      const email = error.customData.email;

      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

const createNewUser = async (user) => {
  await setDoc(doc(db, usersCollectionRef, user.uid), {
    name: user.displayName,
    photo: user.photoURL,
    role: 1,
  });
};
