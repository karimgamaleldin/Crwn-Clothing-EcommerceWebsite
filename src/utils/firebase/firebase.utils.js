import {initializeApp} from 'firebase/app';
import {getAuth, 
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut, 
        onAuthStateChanged
      } from 'firebase/auth'; 
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
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
  initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  const x = {
    prompt: 'select_account',
  }
  provider.setCustomParameters(x);

// getAuth() presists even if we refresh
export const auth = getAuth();
// the signInWithPopup is general that is specified using the provider
export const signInWithGooglePopup = () => signInWithPopup(auth , provider); 
export const signInWithGoogleRedirect = () => signInWithRedirect(auth , provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth , additionalInformation = {}) => {
  if(!userAuth) return;
  const userDocRef = doc(db , 'users' , userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const {displayName , email} = userAuth;
    const createdAt = new Date(); 
    try {
      await setDoc(userDocRef,{displayName,email,createdAt,...additionalInformation});
    }catch (error){
      console.log(error.message);
    }
  }
  //if user data doesnot exists 
  //create /set the document with the data from userAuth in my collection

  //if user data exists
  return userDocRef;
 };;

 // Create a user with email and password
 export const createAuthUserEmailAndPassword = async (email,password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth , email , password);
 }

 //Sign in user with email and password
 export const signInAuthInWithEmailAndPassword = async (email,password) => {
  if (!email || !password) return ;
  return await signInWithEmailAndPassword(auth , email , password);
}


export const signOutUser = async () => await signOut(auth);


export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth , callback);

export const addCollectionAndDocuments = async (collectionKey , objectstoAdd) => {
  const collectionRef = collection(db , collectionKey);
  // a batch is to make sure all the actions related to each other are done together "transaction"
  const batch = writeBatch(db);
  objectstoAdd.forEach((object) => {
    const docRef = doc(collectionRef , object.title.toLowerCase());
    batch.set(docRef , object);
  });
  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db , 'categories')
  const q = query(collectionRef);
  const querySnapShot = await getDocs(q);
  const categoryMap = querySnapShot.docs.reduce((acc , docSnapShot) => {
    const {title , items} = docSnapShot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  } , {});
  return categoryMap;
}