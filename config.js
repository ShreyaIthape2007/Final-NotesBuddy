import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC80mkhAzgLdGi2URO0sEhvlcMrHHU9dCU",
  authDomain: "notesbuddy2-7019f.firebaseapp.com",
  projectId: "notesbuddy2-7019f",
  storageBucket: "notesbuddy2-7019f.appspot.com",
  messagingSenderId: "491417305608",
  appId: "1:491417305608:web:c4586eef71348c25b1c7bd"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    
}

export default firebase.firestore();



