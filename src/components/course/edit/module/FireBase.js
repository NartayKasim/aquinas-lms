import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREAPIKEY,
    authDomain: process.env.REACT_APP_FIREAUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREPROJECTID,
    storageBucket: process.env.REACT_APP_FIRESTORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREMESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREAPIID,
    measurementId: process.env.REACT_APP_FIREMEASUREMENTID
}

const app = firebase.initializeApp(firebaseConfig)
export default app;