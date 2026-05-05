import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQziM-atZbXWRysZ_ok3uUvUHKdAQDE2Y",
  authDomain: "taza-khabar-29496.firebaseapp.com",
  projectId: "taza-khabar-29496",
  storageBucket: "taza-khabar-29496.appspot.com",
  messagingSenderId: "229840125397",
  appId: "1:229840125397:web:5eb520a6d73f36d2d3115c",
  measurementId: "G-JF7SG3JYNC"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  console.error("Error initializing Firebase Auth:", error);
  auth = getAuth(app); // Fallback to standard auth if initializeAuth fails
}

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { auth, firestore, storage };
