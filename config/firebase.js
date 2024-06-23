import { getFirestore } from "firebase/firestore";
import { initializeApp } from "@firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCzuxcifViOjl_ScAvajf1Z8DfqZ-GZn2E",

  authDomain: "farmsense-c8086.firebaseapp.com",

  databaseURL: "https://farmsense-c8086-default-rtdb.firebaseio.com",

  projectId: "farmsense-c8086",

  storageBucket: "farmsense-c8086.appspot.com",

  messagingSenderId: "722173121294",

  appId: "1:722173121294:web:ff5bf154746fe7ebe73d5f",

  measurementId: "G-BX9KBBZPBX",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
