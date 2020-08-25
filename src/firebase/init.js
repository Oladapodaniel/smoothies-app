import firebase from 'firebase'
import firestore from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDI6e6dQQlOJVVqlkdOdQt3SOYliC1n-WM",
    authDomain: "smoothies-app-91d93.firebaseapp.com",
    databaseURL: "https://smoothies-app-91d93.firebaseio.com",
    projectId: "smoothies-app-91d93",
    storageBucket: "smoothies-app-91d93.appspot.com",
    messagingSenderId: "432645100787",
    appId: "1:432645100787:web:b990e89abf2742d0a2d386",
    measurementId: "G-N8NFDQ2YZY"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapShots: true })
// firebase.analytics();
export default firebaseApp.firestore()