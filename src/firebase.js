// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCzQBX3BDFVjsUD3d8GmZCbcNr3g8PeaYg",
    authDomain: "job-application-e9073.firebaseapp.com",
    projectId: "job-application-e9073",
    storageBucket: "job-application-e9073.appspot.com",
    messagingSenderId: "205665581298",
    appId: "1:205665581298:web:e869b8762660914299b86b",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
