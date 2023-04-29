import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    // IT WILL NOT WORK IN PRODUCTION BECAUSE THIS FILE IS IGNORED BECAUSE ITS KEYS ARE PUBLIC
    apiKey: "AIzaSyCXRY11Hd0jxluwVzvf4FRw7UkIDANiW0U",
    authDomain: "mamapoule-17973.firebaseapp.com",
    projectId: "mamapoule-17973",
    storageBucket: "mamapoule-17973.appspot.com",
    messagingSenderId: "341440648365",
    appId: "1:341440648365:web:5e0ff200493c535ea8a224",
    measurementId: "G-9QGB04L37C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;