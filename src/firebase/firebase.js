// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const vapidKey = "BD-CP_TpdlZBHmA7rL1ZUZm5QOee8Xnp1RMrabJcl2xDZTxs08doUgaFGKVZRdEkexFTzGANS8zZzjNEqoOGgMc";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC19uze06uG9MN8hFK1gNTbkCzoFaYtYrA",
  authDomain: "fir-iduc-shopping.firebaseapp.com",
  projectId: "fir-iduc-shopping",
  storageBucket: "fir-iduc-shopping.appspot.com",
  messagingSenderId: "341847170945",
  appId: "1:341847170945:web:b718588a59498b6ca31280",
  measurementId: "G-VJ0BM83NBX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
console.log(db);
// const analytics = getAnalytics(app);
