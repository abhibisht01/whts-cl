// Initialize Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// import 'firebase/compat/storage';

const firebaseConfig = {
 Add Yours
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();    // for database
const auth = firebase.auth();    //for authentication
// const storage = firebase.storage(); //for storage in the databse.
const provider = new firebase.auth.GoogleAuthProvider();// for login google authentication

export { auth, provider };
export default db;
