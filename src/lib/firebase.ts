
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "euro-it",
  appId: "1:598402579759:web:dee51da9965ab181eaf5da",
  storageBucket: "euro-it.firebasestorage.app",
  apiKey: "AIzaSyA2W-Je991xd5WkT0nbEv7VzoK7fd9Kues",
  authDomain: "euro-it.firebaseapp.com",
  messagingSenderId: "598402579759",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
