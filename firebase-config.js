import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDC3grbFHvlaxD-ocfn_3g-7bXW71UGyR8",
  authDomain: "to-doweb-777f4.firebaseapp.com",
  projectId: "to-doweb-777f4",
  storageBucket: "to-doweb-777f4.appspot.com",
  messagingSenderId: "958756819303",
  appId: "1:958756819303:web:cbc262ac4cf82484b75fc2"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
