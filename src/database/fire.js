import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCysWCHJkFfxoDkvFRk2iZkkDnp8NJRXdA",
    authDomain: "test2-project-b775b.firebaseapp.com",
    projectId: "test2-project-b775b",
    storageBucket: "test2-project-b775b.appspot.com",
    messagingSenderId: "888872417455",
    appId: "1:888872417455:web:f05625072c304ceb78fc5a"
  };

  const firebase = initializeApp(firebaseConfig);
  export const firestore = initializeFirestore(firebase,{
    experimentalForceLongPolling: true
    })
  export default firebase