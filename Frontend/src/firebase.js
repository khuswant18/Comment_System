
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEKEcIx-OZEi_zizLTJXvRG7AxNv-1zIM",
  authDomain: "comment-system-c3c5d.firebaseapp.com",
  projectId: "comment-system-c3c5d",
  storageBucket: "comment-system-c3c5d.firebasestorage.app",
  messagingSenderId: "196455908559",
  appId: "1:196455908559:web:727822fdb2b557cee6a3ba"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;