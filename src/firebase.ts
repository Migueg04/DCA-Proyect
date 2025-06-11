
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD9Oo38jUMZNGas337wecxhtTR34gY_CSA",
  authDomain: "dca-proyect.firebaseapp.com",
  projectId: "dca-proyect",
  storageBucket: "dca-proyect.firebasestorage.app",
  messagingSenderId: "664235318431",
  appId: "1:664235318431:web:a7b5a2c2570b5f733996aa",
  measurementId: "G-8Q3GERJFTL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
