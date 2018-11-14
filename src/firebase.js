import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAYf9AbeYwLY892NRiQfn0AMtG9xIFAJbo",
    authDomain: "marten-application.firebaseapp.com",
    databaseURL: "https://marten-application.firebaseio.com",
    projectId: "marten-application",
    storageBucket: "marten-application.appspot.com",
    messagingSenderId: "659856510832"
};

firebase.initializeApp(config);

firebase.auth().signInAnonymously().catch(error => {
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode + " - " + errorMessage);
});

export default firebase;