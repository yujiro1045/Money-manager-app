import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMoEGVDM0htvlgeFBWST5oCjUrDHfg4F8",
  authDomain: "money-manager-9d01c.firebaseapp.com",
  projectId: "money-manager-9d01c",
  storageBucket: "money-manager-9d01c.appspot.com",
  messagingSenderId: "36095706527",
  appId: "1:36095706527:web:0a9ca2bd29e096dd6ee9aa",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
