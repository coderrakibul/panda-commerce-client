import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCUFGsNO7fUTq8VuIvkqQUpw-gG1Qebe9E",
    authDomain: "panda-cm.firebaseapp.com",
    projectId: "panda-cm",
    storageBucket: "panda-cm.appspot.com",
    messagingSenderId: "150406821065",
    appId: "1:150406821065:web:b794dc06aa5582c9934918"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;