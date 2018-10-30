import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import * as admin from 'firebase-admin';

var serviceAccount = require('./keys/marten-application-firebase-adminsdk-zvjmp-c177ac648f.json');

const firebaseApp = admin.initializeApp({
                      credential: admin.credential.cert(serviceAccount),
                      databaseURL: 'https://marten-application.firebaseio.com'
                    });

export default firebase;