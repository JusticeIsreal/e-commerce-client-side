// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrYnJsYHCYLZmqv3ji_o557AoBBKw76jA",
  authDomain: "e-commerce-storage-59d2f.firebaseapp.com",
  projectId: "e-commerce-storage-59d2f",
  storageBucket: "e-commerce-storage-59d2f.appspot.com",
  messagingSenderId: "1044121676716",
  appId: "1:1044121676716:web:c9d0f1de8494a45dbbe809",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const db2 = getFirestore(app);
const storage = getStorage();

export { app, db, storage, db2 };
