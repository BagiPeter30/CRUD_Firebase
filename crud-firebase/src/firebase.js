// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.VITE_FIREBASE_API_KEY,
  authDomain: "fir-firsttest-28dbd.firebaseapp.com",
  projectId: "fir-firsttest-28dbd",
  storageBucket: "fir-firsttest-28dbd.appspot.com",
  messagingSenderId: "957419920738",
  appId: "1:957419920738:web:62d7b1a0a17b2ea73ae03b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)