// firebase-config.js

// Your web app's Firebase configuration
// Replace these with your actual Firebase project details
const firebaseConfig = {
  apiKey: "AIzaSyCtTGAdzfflRJyQ8Cwa-1ZJgtrEc8Mri6g",
  authDomain: "college-obe-system.firebaseapp.com",
  projectId: "college-obe-system",
  storageBucket: "college-obe-system.appspot.com",
  messagingSenderId: "820304760834",
  appId: "1:820304760834:web:ba32f2e8022af6be58171b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create references to auth and database
const auth = firebase.auth();
const db = firebase.firestore();
