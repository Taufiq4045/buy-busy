// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAnlWzgkOCvg6BOXZQ4r21cC6v-s9f8vlo',
  authDomain: 'buybusy-d3263.firebaseapp.com',
  projectId: 'buybusy-d3263',
  storageBucket: 'buybusy-d3263.appspot.com',
  messagingSenderId: '869168429716',
  appId: '1:869168429716:web:8f34075c5ec4ed1a609281',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
