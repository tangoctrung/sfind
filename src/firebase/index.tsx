// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCFB3ONkN9K6BIZpq4UtqUbyuktZuW5DXo",
    authDomain: "storagefile-8768a.firebaseapp.com",
    projectId: "storagefile-8768a",
    storageBucket: "storagefile-8768a.appspot.com",
    messagingSenderId: "58170371584",
    appId: "1:58170371584:web:edfe99ebe773187f73f2e5",
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