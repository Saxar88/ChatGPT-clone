import {getApp, getApps, initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDzuBbRhpsizaFcv9-ihWu9pzByCybxnXk",
	authDomain: "chatgpt-clone-25f42.firebaseapp.com",
	projectId: "chatgpt-clone-25f42",
	storageBucket: "chatgpt-clone-25f42.appspot.com",
	messagingSenderId: "596161128352",
	appId: "1:596161128352:web:ec96edfd86513e53fd26c5",
	measurementId: "G-R8FLV5ZJXE",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
