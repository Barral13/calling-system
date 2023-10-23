import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxQ3Y6MmCMogwICxMFANDM7rr_bb-_41M",
  authDomain: "tickets-f8bc5.firebaseapp.com",
  projectId: "tickets-f8bc5",
  storageBucket: "tickets-f8bc5.appspot.com",
  messagingSenderId: "1012342419018",
  appId: "1:1012342419018:web:e717d38773d4cbe28e40b3",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
