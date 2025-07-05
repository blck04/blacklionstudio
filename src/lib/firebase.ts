// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYS5rqyaouPtSQH3a6Y4uFC9mwwryCF8c",
  authDomain: "black-mosey-creative-studio.firebaseapp.com",
  projectId: "black-mosey-creative-studio",
  storageBucket: "black-mosey-creative-studio.firebasestorage.app",
  messagingSenderId: "1081350771844",
  appId: "1:1081350771844:web:ab5c346f79a0921dfb5ed1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
