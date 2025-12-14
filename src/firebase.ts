// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBokTAKESvzwKl2gzPZTvT3wZ5DgMT9tno",
  authDomain: "ruandri-ed044.firebaseapp.com",
  projectId: "ruandri-ed044",
  storageBucket: "ruandri-ed044.firebasestorage.app",
  messagingSenderId: "319186128178",
  appId: "1:319186128178:web:455a49fbc782933d4f9b2b",
  measurementId: "G-J979B1PZ9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
