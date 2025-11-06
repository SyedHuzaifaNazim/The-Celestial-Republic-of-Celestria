import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLvn0w0be7jfOZ9_GOd2SE1yYiZBYNGUA",
  authDomain: "celestria-46b5e.firebaseapp.com",
  projectId: "celestria-46b5e",
  storageBucket: "celestria-46b5e.firebasestorage.app",
  messagingSenderId: "367540047279",
  appId: "1:367540047279:web:741317746e08a92bfdf35a",
  measurementId: "G-4T6FXPZMDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
