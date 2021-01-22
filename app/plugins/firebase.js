import firebase from 'firebase'
// import firebaseAuth from './firebase.auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDmGnMT66bkyCcGrTYNOWTczIATGwTydmk',
  authDomain: 'timeovergrow-3e1ca.firebaseapp.com',
  projectId: 'timeovergrow-3e1ca',
  storageBucket: 'timeovergrow-3e1ca.appspot.com',
  messagingSenderId: '219011344413',
  appId: '1:219011344413:web:bb9edbc8a3ca0c44ffbef4',
  measurementId: 'G-5KC7H92YQP'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
export const dbMessages = db.collection('messages')

export const auth = firebase.auth
export default firebase
