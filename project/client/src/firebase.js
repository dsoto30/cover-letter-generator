// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMRsUy_ropL5qqs2UpujqjyAS-AiB0Gok",
    authDomain: "covergenai-1b4e3.firebaseapp.com",
    projectId: "covergenai-1b4e3",
    storageBucket: "covergenai-1b4e3.appspot.com",
    messagingSenderId: "372438543412",
    appId: "1:372438543412:web:161f6b33e856ac03f8ee61",
    measurementId: "G-DPXK4P4N7M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
