// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from require('firebase/auth');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOKyAFfuyyU3_smm8AoxSR5QzcUvsPGwk",
  authDomain: "capstone-playground-423804.firebaseapp.com",
  projectId: "capstone-playground-423804",
  storageBucket: "capstone-playground-423804.appspot.com",
  messagingSenderId: "442390864953",
  appId: "1:442390864953:web:5338600fb6f38a465c99e8",
  measurementId: "G-Q1RVRZGQ0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

module.exports = { auth };