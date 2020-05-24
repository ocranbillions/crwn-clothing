import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCnS0hLokAu3YY9u6wo9eVqCcb9gjpda4s",
  authDomain: "crwn-clothing-86b70.firebaseapp.com",
  databaseURL: "https://crwn-clothing-86b70.firebaseio.com",
  projectId: "crwn-clothing-86b70",
  storageBucket: "crwn-clothing-86b70.appspot.com",
  messagingSenderId: "1096840791855",
  appId: "1:1096840791855:web:79203e71eebdb8113883da",
  measurementId: "G-R2X8304C33"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
