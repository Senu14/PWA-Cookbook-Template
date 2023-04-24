
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
  import { getFirestore,collection,onSnapshot,query, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";
  import { renderRecipe } from "./ui.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAotJPZcQ7kvos18VNvKXk6XSyLOJIiFbk",
    authDomain: "pwa-cookbook-18969.firebaseapp.com",
    projectId: "pwa-cookbook-18969",
    storageBucket: "pwa-cookbook-18969.appspot.com",
    messagingSenderId: "698797018294",
    appId: "1:698797018294:web:826415b7a403650d622a17"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  enableIndexedDbPersistence(db)

  
  const getData = async collectionName => {
     const q = query(collection(db, collectionName))
 
const snapshot = onSnapshot(q,querySnapshot =>{
     querySnapshot.docChanges().forEach(change => {
        if(change.type === "added") {
          renderRecipe(change.doc.data(), change.doc.id)

        }
        if(change.type === "removed") {
            // Fjern data fra app
          
        }
     })
})
  }


  export { db, getData }
