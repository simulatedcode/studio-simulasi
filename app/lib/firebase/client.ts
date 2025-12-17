// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASPRgGu1D3A44fb0I5ba066LN_wMPBpQo",
  authDomain: "simulasi-studio.firebaseapp.com",
  projectId: "simulasi-studio",
  storageBucket: "simulasi-studio.firebasestorage.app",
  messagingSenderId: "691701951485",
  appId: "1:691701951485:web:6fd43ab6e2f4e267480794",
  measurementId: "G-VRMWEV68PS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
