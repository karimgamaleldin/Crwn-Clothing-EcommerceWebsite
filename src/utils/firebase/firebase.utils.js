import {initializeApp} from 'firebase/app';
import {getAuth, 
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider} from 'firebase/auth'; 
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCr-CwMTs5v0E9wCqf6QAng88xJ7lTEHv4",
    authDomain: "crwn-clothing-db-62630.firebaseapp.com",
    projectId: "crwn-clothing-db-62630",
    storageBucket: "crwn-clothing-db-62630.appspot.com",
    messagingSenderId: "662336695611",
    appId: "1:662336695611:web:a34bb13da6c66fa8dedb1e"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  const x = {
    prompt: 'select_account',
  }
  provider.setCustomParameters(x);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth , provider); 

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db , 'users' , userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  if (!userSnapshot.exists()) {
    const {displayName , email} = userAuth;
    const createdAt = new Date(); 
    try {
      await setDoc(userDocRef,{displayName,email,createdAt});
    }catch (error){
      console.log(error.message);
    }
  }
  //if user data doesnot exists 
  //create /set the document with the data from userAuth in my collection

  //if user data exists
  return userDocRef;
 };;