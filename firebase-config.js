import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, getDoc, setDoc , deleteDoc, doc, arrayUnion, collection, connectFirestoreEmulator} from "firebase/firestore";
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app)
const provider = new GoogleAuthProvider();

const usersCollectionRef = collection(db, 'users');
const exercisesCollectionRef = collection(db, 'exercises');
const workoutsCollectionRef = collection(db, 'workouts');
// Firebase features

export  const signInWithGoogle = async () => {
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
  .then(async (result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log(result);
    // The signed-in user info.
    const user = result.user;
    const docRef = doc(db, usersCollectionRef, user.uid);
    const userDoc = await getDoc(docRef);

    if(!userDoc.exists()){
        createNewUser(user);
    }

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

export const deleteUser = () => {
    const currentUser = auth.currentUser
    currentUser.delete();
    //needs further implementation to delete information stored for a user
}

const deleteWorkout = async (workoutRef) => {
    await deleteDoc(doc())
}

export function signOutUser(){
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}

/*onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    window.user = user;
  } else {
    // put logic for signout here
  }
});*/

const createNewUser = async (user) => {
await setDoc(doc(db, usersCollectionRef, user.uid), {
    name : user.displayName,
    photo : user.photoURL,
    role : 1,
});
}
  
const setAdmin = (user) => {
const userRef = doc(db, usersCollectionRef, user.id);
updateDoc(userRef, {
    role : 0,
})
}

const addFavExercises = (user, exerciseRef) => {
const userRef = doc(db, usersCollectionRef, user.id);
updateDoc(userRef, {
    favouriteExercises : arrayUnion(exerciseRef)
})
}

const removeFavExercises = (user, exerciseRef) => {
const userRef = doc(db, usersCollectionRef, user.id);
updateDoc(userRef, {
    favouriteExercises : arrayRemove(exerciseRef)
})
}

const addFavWorkouts = (user, workoutRef) => {
const userRef = doc(db, usersCollectionRef, user.id);
updateDoc(userRef, {
    favouriteWorkouts : arrayUnion(workoutRef)
})
}

const removeFavWorkouts = (user, workoutRef) => {
const userRef = doc(db, usersCollectionRef, user.id);
updateDoc(userRef, {
    favouriteWorkouts : arrayRemove(workoutRef)
})
}


  