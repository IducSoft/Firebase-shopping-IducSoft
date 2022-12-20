import React,{ useContext, useState, useEffect } from 'react';
import {AppContext} from "../App.js";
import { addNewTaskToDB, deleteTaskToDB, getTasks, updateTaskToDB } from '../firebase/taskController.js';
import Swal from 'sweetalert2';



const DashBoard = () => {
  const [state, dispatch] = useContext(AppContext);
  const [task, setTask] = useState({title:"", description:"", id: null});
  const [mode, setMode] = useState("add");

  const makeRandomId= (length) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return result;
}


  const addTask = async () =>{
    let taskToAdd = task
    taskToAdd.id = makeRandomId(10);
    await addNewTaskToDB(taskToAdd, state.user.displayName);
    setTask({title:"", description:"", id: null})
    obtenerLista()
  }

  const obtenerLista = async ()=>{
    const ListaParaState = await getTasks(state.user.displayName);
    // console.log(ListaParaState)
    dispatch({type:"GETLISTTASK", payload:[...ListaParaState]})
  }

  const editarTask =(id)=> {

    const taskToEdit = state.ListTask.find((el) => el.id === id)
    console.log(taskToEdit.id, id);
    setMode("update")
    setTask({...taskToEdit});
  }

  const updateTask = async () =>{

    await updateTaskToDB(task, state.user.displayName)
    setMode("add")
    setTask({title:"", description:"", id: null})
    obtenerLista()

  }

  const eliminarTarea = async (id)=>{
    
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then( async (result) => {
      if (result.isConfirmed) {
        
        await deleteTaskToDB(id, state.user.displayName)
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        )
        obtenerLista()
      }
    })
  }

  useEffect(() => {
    obtenerLista();
    // eslint-disable-next-line
  }, []) 
  
  console.log(state.ListTask)

  return (

    <>
      <div className='mt-20 bg-violet-300 px-4 py-3 my-3'>
      
      <div className='w-full text-left'>
      <h1>welcome to our App </h1>
        <span>
          <h1>{state.user.displayName}</h1>
        </span>
      
      </div>
      </div>
      <div className="w-full max-w-lg px-4 py-3 flex">
        <div className='datos'>
        <div className="flex flex-wrap -mx-3 mb-6 w-full">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
              Title
            </label>
            <input value={task.title}
             className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
             id="grid-first-name" 
             type="text" 
             placeholder="Title Task"
             onChange={(e)=>{setTask({...task, title: e.target.value})}}
              />
            
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Description
            </label>
            <input 
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
             id="grid-last-name" 
             type="text" 
             placeholder="Description"
             value={task.description}
             onChange={(e)=>{setTask({...task, description: e.target.value})}}
              />
          </div>
        </div>

        
        

        
        {
          mode === "add" ? 
        (<button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" placeholder='Añadir' onClick={()=> {addTask()}}>
          añadir
        </button>) : 
        (<button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded" placeholder='Añadir' onClick={()=> {updateTask()}}>
          Actualizar
        </button>)
        }
        

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4'>
        {
          state.ListTask.map((e) => {

            return(
              <div className="rounded-lg border border-sky-300 p-4 flex flex-col gap-2 " key={e.id} id={e.id}>
                <h1 className="font-semibold">{e.title}</h1>
                <p className='border-t border-sky-300'>{e.description}</p>
                <div className='flex justify-between'>
                <button className='bg-sky-400 text-white py-1 px-2 rounded' onClick={()=>{editarTask(e.id)}}>Editar</button>
                <button className='bg-red-600 text-white py-1 px-2 rounded' onClick={()=>{eliminarTarea(e.id)}}>Eliminar</button>
                </div>
              </div>
            )
          })
        }
        </div>
        
        
        </div>
      </div>
    </>
    
  )
}

export default DashBoard;