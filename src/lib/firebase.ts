import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA5K2YjFckrjCvOAfg5uO6QyK-PvQohCQU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "eman-soliman-portfolio.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "eman-soliman-portfolio",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "eman-soliman-portfolio.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "974405962458",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:974405962458:web:cda2eda4f8a4e36155b3e3",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-PQFMVJPH98",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
