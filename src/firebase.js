// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage"

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
const storage = getStorage(app)

/* import { getStorage, ref } from "firebase/storage";

// Create a root reference
const storage = getStorage();

// Create a reference to 'mountains.jpg'
const mountainsRef = ref(storage, 'mountains.jpg');

// Create a reference to 'images/mountains.jpg'
const mountainImagesRef = ref(storage, 'images/mountains.jpg');

// While the file names are the same, the references point to different files
mountainsRef.name === mountainImagesRef.name;           // true
mountainsRef.fullPath === mountainImagesRef.fullPath;   // false  */

// gs://job-application-e9073.appspot.com
