// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMEOS3BPcKvrh8kY89_fNXB7Qv4_Efz_k",
  authDomain: "planit-27639.firebaseapp.com",
  projectId: "planit-27639",
  storageBucket: "planit-27639.appspot.com",
  messagingSenderId: "50306660148",
  appId: "1:50306660148:web:f7d8d1b7cc05ad281f9761",
  measurementId: "G-4KE6DMCBB6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage();
// const imageRef = (name) => {
//   ref(storage, `images/${name}.jpg`);
// };
export { db, storage };
