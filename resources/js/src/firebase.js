import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSodOEWmI5VCRseDKvMt1oDk_h4tilQ2g",
  authDomain: "loan-saathi.firebaseapp.com",
  projectId: "loan-saathi",
  storageBucket: "loan-saathi.appspot.com",
  messagingSenderId: "1089238116039",
  appId: "1:1089238116039:web:f59e7b2e7f15b93806c0e2",
  measurementId: "G-HMQ9CMVFDX"
};

const app = initializeApp(firebaseConfig);
var storage = getStorage(app);
export default storage;