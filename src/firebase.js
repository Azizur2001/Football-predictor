import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAcD5vnQaK_bbs4xkP-MLhZMQmZW3IVvO4",
  authDomain: "football-predictor-bf609.firebaseapp.com",
  projectId: "football-predictor-bf609",
  storageBucket: "football-predictor-bf609.appspot.com",
  messagingSenderId: "334297349773",
  appId: "1:334297349773:web:2b9729ca1c2db15e556cc4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

