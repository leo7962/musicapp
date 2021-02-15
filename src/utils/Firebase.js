import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBzMV51AkgNrcMvx61CK6rkKT2VP8xI0Gs",
    authDomain: "musicapp-b68c1.firebaseapp.com",
    projectId: "musicapp-b68c1",
    storageBucket: "musicapp-b68c1.appspot.com",
    messagingSenderId: "738674213832",
    appId: "1:738674213832:web:acef446f4d2b0e1e2936fd"
};

export default firebase.initializeApp(firebaseConfig);