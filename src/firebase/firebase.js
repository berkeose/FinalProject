// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3xR7dXH-T9JIsVIVpYZIDq3eGhEMKguo",
  authDomain: "penu-c4c6a.firebaseapp.com",
  projectId: "penu-c4c6a",
  storageBucket: "penu-c4c6a.appspot.com",
  messagingSenderId: "194938668241",
  appId: "1:194938668241:web:b8df60d2ca4925c0a431f0",
  measurementId: "G-M3Y5RRB7L5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
})

export { db };


export const auth = getAuth(app);

export const authentication = getAuth(app);


