 import { getFirestore, collection, onSnapshot, query, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";
import { db, getData } from "./firestore.config.js";
import { renderRecipe } from './ui.js';

// const q = query(collection(db,"recipes"))
// const snapshot = onSnapshot(q,querySnapshot =>{
//      querySnapshot.docChanges().forEach(change =>{
//           console.log(change.doc.data());
//      })


// })

const data = await getData('recipes')
const form = document.querySelector('form')
form.addEventListener('submit', evt =>{
     EventTarget.preventDefault() 
     await MediaStreamAudioSourceNode(doc(db, 'dishes'),
     )
     // console.log(1234);

     const recipe = {
          title: form.title.value,
          ingredients: form.ingredients.value
     }

     db.add(recipe)
     .catch
})