import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDBtukR2bpaG9qIm83or8xQhtHxXcOfwfk",
  authDomain: "reactnative-hw-42cb2.firebaseapp.com",
  projectId: "reactnative-hw-42cb2",
  storageBucket: "reactnative-hw-42cb2.appspot.com",
  messagingSenderId: "969090919898",
  appId: "1:969090919898:web:9962c1d8e0d1450dc8a4e3",
  measurementId: "G-JQW1YMJY4Y",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, auth, storage };
