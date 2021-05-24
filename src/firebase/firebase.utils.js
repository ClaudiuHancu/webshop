import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAYZQBGdwVSySh1Qd20Sqf-XjCyTX1xR9k",
  authDomain: "webshop-b221d.firebaseapp.com",
  projectId: "webshop-b221d",
  storageBucket: "webshop-b221d.appspot.com",
  messagingSenderId: "566258573948",
  appId: "1:566258573948:web:ec1a1fd00aa03d9781dff9",
  measurementId: "G-BEBYFWPMD8",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const collectionRef = firestore.collection(`users`);

  const snapShot = await userRef.get();
  const collectionSnapshot = await collectionRef.get();
  console.log({ collection: collectionSnapshot.docs.map((doc) => doc.data()) });

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.array.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
