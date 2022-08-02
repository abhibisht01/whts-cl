// Initialize Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAM4nVc5DoL7bIMMrWR0F6fQkbhBty2zus",
    authDomain: "whts-cl.firebaseapp.com",
    projectId: "whts-cl",
    storageBucket: "whts-cl.appspot.com",
    messagingSenderId: "278886590182",
    appId: "1:278886590182:web:8f496dc520b1e8ddf1fd27",
    measurementId: "G-C4N0G85QRN"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();    // for database
const auth = firebase.auth();    //for authentication
// const storage = firebase.storage(); //for storage in the databse.
const provider = new firebase.auth.GoogleAuthProvider();// for login google authentication

export { auth, provider };
export default db;