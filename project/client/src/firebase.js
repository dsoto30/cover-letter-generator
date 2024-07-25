import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "covergenai-1b4e3.firebaseapp.com",
    projectId: "covergenai-1b4e3",
    storageBucket: "covergenai-1b4e3.appspot.com",
    messagingSenderId: "372438543412",
    appId: "1:372438543412:web:161f6b33e856ac03f8ee61",
    measurementId: "G-DPXK4P4N7M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");

const db = getFirestore(app);
connectFirestoreEmulator(db, "localhost", 8080);

const storage = getStorage(app);
connectStorageEmulator(storage, "localhost", 9199);

const functions = getFunctions(app);
connectFunctionsEmulator(functions, "localhost", 5001);

export { auth, db, storage, functions };
