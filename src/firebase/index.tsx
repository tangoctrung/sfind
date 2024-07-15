// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: "storagefile-8768a.firebaseapp.com",
    projectId: "storagefile-8768a",
    storageBucket: "storagefile-8768a.appspot.com",
    messagingSenderId: "58170371584",
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: "G-WW6LXJKETC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);
const storageRef = ref(storage);

export {
    storage, storageRef
}