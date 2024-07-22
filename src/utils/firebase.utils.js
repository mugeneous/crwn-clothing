import { initializeApp } from "firebase/app";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWMwIGtvPK02qbDGHP5wYPHu6rIXiJGCE",
  authDomain: "crwn-clothing-db-aa07f.firebaseapp.com",
  projectId: "crwn-clothing-db-aa07f",
  storageBucket: "crwn-clothing-db-aa07f.appspot.com",
  messagingSenderId: "43968020377",
  appId: "1:43968020377:web:552312067aa0b88ff65d08",
};

// initialize Firebase
const app = initializeApp(firebaseConfig);

// provider for generating an oAuthCredential
const provider = new GoogleAuthProvider();

// when user interact with provider, we want force them to select an account
provider.setCustomParameters({
  prompt: "select_account",
});

// return auth instance
export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

// this function create a user document in a firestore database if it doesnt exist
export const createUserDocFromAuth = async (
  uid,
  additionalInformation = {}
) => {
  // Gets a DocumentReference instance that refers to the document at the specified absolute path.
  const userDocRef = doc(db, "users", uid);

  // read the document referred to by this documentReference
  const userSnapshot = await getDoc(userDocRef);

  // if data doesnt exist, then create a new one
  if (!userSnapshot.exists()) {
    const { displayName, email } = auth.currentUser;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    alert("mohon isi semua");
    return;
  }

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
