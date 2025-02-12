// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwogXQFLGhuo93TznSQVcnkRX0zfRRUXQ",
  authDomain: "austronaut-3eae4.firebaseapp.com",
  projectId: "austronaut-3eae4",
  storageBucket: "austronaut-3eae4.firebasestorage.app",
  messagingSenderId: "181098206973",
  appId: "1:181098206973:web:ee876c8b94225ff4409094"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);