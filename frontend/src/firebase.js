import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyClY4haytyt9CUQzfiA8rv7Bh8O7xMo-Eg",
  authDomain: "chatbot-1f971.firebaseapp.com",
  projectId: "chatbot-1f971",
  storageBucket: "chatbot-1f971.appspot.com",
  messagingSenderId: "806966458342",
  appId: "1:806966458342:web:7fc73cd24cc606b5228827",
  measurementId: "G-HKJJ9BNWBK"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);  

const db = getFirestore(app);

const storage = getStorage(app);

export {db, auth, storage};