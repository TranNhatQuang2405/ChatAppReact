import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
console.log(process.env.REACT_APP_FIREBASE_API_KEY);
const firebaseConfig = {
    apiKey: "AIzaSyCG1qZI7gpxhSdz54_mQH9wlmmb8zwfn-I",
    authDomain: "chatapp-fe4a6.firebaseapp.com",
    projectId: "chatapp-fe4a6",
    storageBucket: "chatapp-fe4a6.appspot.com",
    messagingSenderId: "965486165414",
    appId: "1:965486165414:web:a66a2ffeaa765aae6da367",
    measurementId: "G-KGC0M11M43",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "redirect",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/MainPage",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        FacebookAuthProvider.PROVIDER_ID,
    ],
};
export { app };