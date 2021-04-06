import Firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAbxWSCPwjH9F6Ws5HJ-z22_jVniyQhblc",
    authDomain: "stock-viewer-4a637.firebaseapp.com",
    databaseURL: "https://stock-viewer-4a637-default-rtdb.firebaseio.com",
    projectId: "stock-viewer-4a637",
    storageBucket: "stock-viewer-4a637.appspot.com",
    messagingSenderId: "540629891000",
    appId: "1:540629891000:web:a9637a042048dd5b48014d",
    measurementId: "G-DRVF9JHLXV",
};

export const firebase = Firebase.initializeApp(firebaseConfig);
