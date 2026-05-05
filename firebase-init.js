// Firebase 초기화 및 공통 설정
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyDsDbDNjyVZqjLED3TVzSHHdw-S69qUFFQ",
  authDomain: "k-marketinglab.firebaseapp.com",
  projectId: "k-marketinglab",
  storageBucket: "k-marketinglab.firebasestorage.app",
  messagingSenderId: "365197236716",
  appId: "1:365197236716:web:02e7b137d12cc3890d88c9",
  measurementId: "G-4THQ1NRKE4"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// Export
export { app, db, auth, storage, analytics };
