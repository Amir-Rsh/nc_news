import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyCEwNITYzlnFwqAfFpYDsnzzG1ScByPRNo",
//   authDomain: "nc-news-682dd.firebaseapp.com",
//   projectId: "nc-news-682dd",
//   storageBucket: "nc-news-682dd.appspot.com",
//   messagingSenderId: "1086018292157",
//   appId: "1:1086018292157:web:0a99a19c4bd402313eaad4",
// };

initializeApp(firebaseConfig);
export const auth = getAuth();
