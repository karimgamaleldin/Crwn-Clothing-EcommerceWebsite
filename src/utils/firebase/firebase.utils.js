import {initializeApp} from 'firebase/app';
import {getAuth, 
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider} from 'firebase/auth'; 

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
  provider.setCustomParameters({
    prompt: "select-account"
  });

  export const auth = getAuth();
 export const signInWithGooglePopup = () => signInWithPopup(auth , provider); 