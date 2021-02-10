import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyAEFHkdyYqCLfQZC_nXAnoNRFbR_kWsvVU',
	authDomain: 'timeovergrow-d76f5.firebaseapp.com',
	projectId: 'timeovergrow-d76f5',
	storageBucket: 'timeovergrow-d76f5.appspot.com',
	messagingSenderId: '868668025407',
	appId: '1:868668025407:web:3790913986172449dce68a',
	measurementId: 'G-9W2YX5YWTX'
<<<<<<< HEAD
}
=======
};
>>>>>>> ca57608e26590f317a528f326b62ecf182f82cb2

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const dbMessages = db.collection('messages');

<<<<<<< HEAD
export const auth = firebase.auth
export default firebase
=======
export const auth = firebase.auth;
export default firebase;
>>>>>>> ca57608e26590f317a528f326b62ecf182f82cb2
