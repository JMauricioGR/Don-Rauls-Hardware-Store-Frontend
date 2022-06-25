import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHJMUccKmqiIQt8wvBdjVZYhsNo-wU7Yc",
  authDomain: "donraulshardwarestore-46d28.firebaseapp.com",
  projectId: "donraulshardwarestore-46d28",
  // storageBucket: "donraulshardwarestore-46d28.appspot.com",
  messagingSenderId: "1383365807",
  appId: "1:1383365807:web:4a202e3c304047ee26a85a",
  storageBucket: "gs://donraulshardwarestore-46d28.appspot.com"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage(app);