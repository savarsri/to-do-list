import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCOucNidin8D4H22koNTNtcaHqHz4rGkKE",
    authDomain: "to-do-list-svelte.firebaseapp.com",
    projectId: "to-do-list-svelte",
    storageBucket: "to-do-list-svelte.appspot.com",
    messagingSenderId: "821097762299",
    appId: "1:821097762299:web:e1b287cb5141333cf40f5e",
    measurementId: "G-STREJD46FW"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(); 
  export const auth = getAuth(app);

