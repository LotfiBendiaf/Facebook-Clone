// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFqoum0_jTYrMTYHCjSbrdnkUlM_2zmyI",
  authDomain: "facebook-clone-social.firebaseapp.com",
  projectId: "facebook-clone-social",
  storageBucket: "facebook-clone-social.appspot.com",
  messagingSenderId: "701987396122",
  appId: "1:701987396122:web:0736ff1f32c3a06d298fa3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export  { db, storage };