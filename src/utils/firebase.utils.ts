import { initializeApp } from "firebase/app";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Category } from "../store/categories/categories.types";

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

const db = getFirestore();
// provider for generating an oAuthCredential
const provider = new GoogleAuthProvider();

// return auth instance
export const auth = getAuth();

// when user interact with provider, we want force them to select an account
provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

// this function create a user document in a firestore database if it doesnt exist
export const createUserDocFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  // Gets a DocumentReference instance that refers to the document at the specified absolute path.
  const userDocRef = doc(db, "users", userAuth.uid);

  // read the document referred to by this documentReference
  const userSnapshot = await getDoc(userDocRef);

  // if data doesnt exist, then create a new one
  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    alert("mohon isi semua");
    return;
  }

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  onAuthStateChanged(auth, callback);
};

// so function getCurrentUser ini digunakan untuk mengecek apakah user terauthentikasi atau tidak.
// jadi ketika getCurrentUser dipanggil, dia akan mengembalikan sebuah promise. Di dalam promise, terdapat onAuthStateChanged listener.
// jika user authenticated, listener akan mentrigger resolve the promise dengan user data dan unsubscribe
// jika terdapat error, error itu akan dimasukan ke dalam reject function
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "category");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
};
