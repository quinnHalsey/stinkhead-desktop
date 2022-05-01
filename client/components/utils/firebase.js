// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCM3XVrna1mJw4DCgMZPJZ_Z2CjPAF0KbI",
  authDomain: "stackathon-stinkhead.firebaseapp.com",
  databaseURL: "https://stackathon-stinkhead-default-rtdb.firebaseio.com",
  projectId: "stackathon-stinkhead",
  storageBucket: "stackathon-stinkhead.appspot.com",
  messagingSenderId: "466951368819",
  appId: "1:466951368819:web:f2883d88840dac85063a06",
  measurementId: "G-YK6QDLT8TS",
};

const firebase = initializeApp(firebaseConfig);
export const rtDatabase = getDatabase();
export const auth = getAuth();
// const analytics = getAnalytics(firebase);

export default firebase;
