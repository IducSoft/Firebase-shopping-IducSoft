// En este fichero crearemos todda la logica para nuestra base de datos
import { db } from "./firebase.js"
import { collection, addDoc, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore"; 



// CRUD

// Create document at database
export const addNewTaskToDB = async (task, userName)=>{

    await addDoc(collection(db, userName), task)
}


// Read database

export const getTasks = async (nameUser)=>{
    const querySnapshot = await getDocs(collection(db, nameUser));
    const tasks = querySnapshot.docs.map(doc=>{
        return {...doc.data(), id:doc.id}
    })
    return tasks;
    
}


// Update task

export const updateTaskToDB = async (task, nameUser)=>{
    console.log(task, nameUser)
    await setDoc(doc(db, nameUser, task.id),{

        title:task.title,
        description:task.description
    })
}


export const deleteTaskToDB = async (id, nameUser)=>{

    await deleteDoc(doc(db, nameUser, id))
}




