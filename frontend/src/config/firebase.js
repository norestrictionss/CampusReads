// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, query, onSnapshot} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnG4HZtmCyBQGS-hPCkA1O1JssSXgnmeg",
  authDomain: "campusreads-dc7fb.firebaseapp.com",
  databaseURL: "https://campusreads-dc7fb-default-rtdb.firebaseio.com",
  projectId: "campusreads-dc7fb",
  storageBucket: "campusreads-dc7fb.appspot.com",
  messagingSenderId: "68866003134",
  appId: "1:68866003134:web:5a7a43f8e59fd2c0664eef",
  measurementId: "G-ZRM57BVWZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase();
export const auth = getAuth(app);
export const storage = getStorage(app);



