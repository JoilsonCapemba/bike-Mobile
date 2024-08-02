import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAbJe8XqSeFYFdHKomew172IT79416LnuA",
  authDomain: "trocas-7ef51.firebaseapp.com",
  projectId: "trocas-7ef51",
  storageBucket: "trocas-7ef51.appspot.com",
  messagingSenderId: "707470969266",
  appId: "1:707470969266:ios:410bce82df9732c1303cab"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
