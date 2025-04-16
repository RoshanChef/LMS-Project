// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXbG0cBVrf1IgdYiJvRMNq20QV45zVclY",
    authDomain: "lms-project-f2d3f.firebaseapp.com",
    projectId: "lms-project-f2d3f",
    storageBucket: "lms-project-f2d3f.firebasestorage.app",
    messagingSenderId: "851291311104",
    appId: "1:851291311104:web:cb79e6d9ca3d572e341ce5",
    measurementId: "G-46BERWHKBX"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const google_provider = new GoogleAuthProvider();


export { auth, google_provider, };