// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQziM-atZbXWRysZ_ok3uUvUHKdAQDE2Y",
  authDomain: "taza-khabar-29496.firebaseapp.com",
  projectId: "taza-khabar-29496",
  storageBucket: "taza-khabar-29496.appspot.com",
  messagingSenderId: "229840125397",
  appId: "1:229840125397:web:5eb520a6d73f36d2d3115c",
  measurementId: "G-JF7SG3JYNC"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
