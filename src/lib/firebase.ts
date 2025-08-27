
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "artisanai-d7bst",
  "appId": "1:814101910943:web:54351e35663cd1638619aa",
  "storageBucket": "artisanai-d7bst.firebasestorage.app",
  "apiKey": "AIzaSyBsb1T04XXbg2CyGOt7xgyEmUVNgE54-fk",
  "authDomain": "artisanai-d7bst.firebaseapp.com",
  "messagingSenderId": "814101910943"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
