import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC9TpZ-GLabahGkXOujAjk4czrI92ZJGCQ",
  authDomain: "notter-io.firebaseapp.com",
  projectId: "notter-io",
  storageBucket: "notter-io.appspot.com",
  messagingSenderId: "89244685143",
  appId: "1:89244685143:web:35025c7cc74f6b98826412"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);