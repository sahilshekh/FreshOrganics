// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDMYQLiGwXyvt9VnGWm1hp3b1QSOk-qXJc",
  authDomain: "onlyfams-5fec4.firebaseapp.com",
  projectId: "onlyfams-5fec4",
  storageBucket: "onlyfams-5fec4.firebasestorage.app",
  messagingSenderId: "151101608045",
  appId: "1:151101608045:web:aa223c5f4e97a793aeaf64",
  measurementId: "G-YL3Q99PF7P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Offline persistence failed: multiple tabs open, persistence will be disabled.');
  } else if (err.code === 'unimplemented') {
    console.warn('Offline persistence is not available in this browser.');
  }
});

// Connect to emulator in development
if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export { db, auth };
