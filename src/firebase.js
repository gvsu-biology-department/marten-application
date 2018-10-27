import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyAYf9AbeYwLY892NRiQfn0AMtG9xIFAJbo",
    authDomain: "marten-application.firebaseapp.com",
    databaseURL: "https://marten-application.firebaseio.com",
    projectId: "marten-application",
    storageBucket: "marten-application.appspot.com",
    messagingSenderId: "659856510832"
};

firebase.initializeApp(config);

export default firebase;