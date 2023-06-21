import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBLgqXyxzHrfpSzRDbIfde3Ig4lPxv8YRU",
  authDomain: "testblogpoject.firebaseapp.com",
  projectId: "testblogpoject",
  storageBucket: "testblogpoject.appspot.com",
  messagingSenderId: "1085059468651",
  appId: "1:1085059468651:web:4f6310e02928235a9e102e",
  measurementId: "G-1B34YFKXKB",
});

const fb = firebase;

export default fb;
