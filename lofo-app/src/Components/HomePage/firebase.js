import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCr1oYl7yuLkyZ3NayLgY3Bhl_DGU85alQ",
  authDomain: "lost-and-found-app-19876.firebaseapp.com",
  projectId: "lost-and-found-app-19876",
  storageBucket: "lost-and-found-app-19876.appspot.com",
  messagingSenderId: "78186596505",
  appId: "1:78186596505:web:baf45ff21342f0a1285008",
  measurementId: "G-Q02D12PE4Z"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;