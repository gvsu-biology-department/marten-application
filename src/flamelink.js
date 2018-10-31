import firebaseApp from './firebase.js';
import flamelink from 'flamelink';

const flamelinkApp = flamelink({ firebaseApp });

export default flamelinkApp;