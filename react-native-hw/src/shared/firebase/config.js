import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIYraZohKLcRO08guV9aggMA-wuJk53qc",
  authDomain: "whowherechat.firebaseapp.com",
  projectId: "whowherechat",
  storageBucket: "whowherechat.appspot.com",
  messagingSenderId: "944637927902",
  appId: "1:944637927902:web:1d29ccd9a42b6c1d14fd4f",
  measurementId: "G-FNBK1MZWE2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
