import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore, collection, getDoc } from 'firebase/firestore';

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
const analytics = getAnalytics(app);

const auth = getAuth(app);  
export { app, auth };