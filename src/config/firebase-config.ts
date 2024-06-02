// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAtz6Fe34C6uPE7bQAbFepeMQh_0985qg",
  authDomain: "theia-fifa-championship.firebaseapp.com",
  projectId: "theia-fifa-championship",
  storageBucket: "theia-fifa-championship.appspot.com",
  messagingSenderId: "724744838989",
  appId: "1:724744838989:web:3714d1421b79f235836104",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { app, db, auth };
