import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAEbvZ_kYkS-ql_dcEjNjh9LKUVvXBt0HE",
    authDomain: "my-store-12498.firebaseapp.com",
    databaseURL: "https://my-store-12498.firebaseio.com",
    projectId: "my-store-12498",
    storageBucket: "my-store-12498.appspot.com",
    messagingSenderId: "298010348954",
    appId: "1:298010348954:web:3ed3786ccdcf015a"
  };
  
const fb = firebase.initializeApp(config);

const db = firebase.firestore();

export {fb,db}