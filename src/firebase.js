import * as admin from 'firebase-admin';

var serviceAccount = require('./keys/marten-application-firebase-adminsdk-zvjmp-c177ac648f.json');

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://marten-application.firebaseio.com",
  storageBucket: "marten-application.appspot.com"      
};

const firebaseApp = admin.initializeApp(firebaseConfig);

export default 'firebase-admin';