import React,{ useContext, useState, useEffect } from 'react';
import {AppContext} from "../App.js";
import { addNewTaskToDB, deleteTaskToDB, getTasks, updateTaskToDB } from '../firebase/taskController.js';
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom";
import { GoogleAuthProvider, getAuth, signOut } from "firebase/auth";
import { LocalStorageRemove } from '../LocalStoragePersistence.js';
import Appnote from "../images/publicalo.png";
import { CgAddR } from "react-icons/cg";
import { AiOutlineCloseCircle } from "react-icons/ai";



const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.languageCode = 'it';
// // To apply the default browser preference instead of explicitly setting it.
// // firebase.auth().useDeviceLanguage();


const DashBoard = () => {
  const [state, dispatch] = useContext(AppContext);
  const [task, setTask] = useState({title:"", description:"", id: null});
  const [mode, setMode] = useState("add");

  const [displayMode, setDisplayMode] = useState(false);

  const navigate = useNavigate();

  const makeRandomId = (length) => {
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
    setDisplayMode(false);
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
    setDisplayMode(true)
    setMode("update")
    setTask({...taskToEdit});
  }

  const updateTask = async () =>{
    await updateTaskToDB(task, state.user.displayName)
    setMode("add")
    setDisplayMode(false)
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

  const LogOutWithGoogle=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch({type:'LOGOUT'})
      navigate("/")
      LocalStorageRemove()
    }).catch((error) => {
      // An error happened.
    });
  }

  useEffect(() => {
    
    // buscarLocalStorage()
    if(state.isLogin === false){

      navigate("/")
    }
    if(state.isLogin === true){
      obtenerLista();
    }
    
    // eslint-disable-next-line
  }, [])

  

  
  console.log(provider)

  return (

    
    <div className='w-full h-screen bg-white dashboardcrear'>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-900 shadow">
          <div className="container flex flex-wrap items-center justify-between mx-auto">
          <div  className="flex items-center">
              <img src={Appnote} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">App Notes</span>
          </div>
          <div className="flex items-center md:order-2">
            <button onClick={(e)=> LogOutWithGoogle()} className='btn bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-200 hover:text-black transition'>
              Log Out
            </button>
          </div>
          
          
          </div>
      </nav>
      <div className="flex px-3 py-2 items-center pt-6">
        <div>
          {
            state.isLogin === true && (<img src={state.user.photoURL} className="mr-3 sm:h-9 perfil-google rounded-full" alt="Flowbite Logo" />)
          }
        </div>
        <h2>
        {
          state.isLogin === true && (<p>{state.user.displayName}</p>)
        }
        </h2>
        
      </div>
      <div className='px-3 py-2'>
      <button onClick={(e)=> setDisplayMode(!displayMode)} class="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
        <CgAddR/>
        <span className='mx-2'>Crear Tarea</span>
      </button>
      </div>
      {
        displayMode === true && (
          <div>
          <div className='modalCrearTarea' >
            <div className='modalContainer'>
            <div className='bg-white'>
              <div className='mt-20 bg-violet-300 px-4 py-3 my-3'>
              
              <div className='w-full text-left flex items-center justify-between'>
              <div  className="flex items-center">
              <img src={Appnote} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">App Notes</span>
              </div>
                
                <div  className="flex items-center">
                  <AiOutlineCloseCircle className='text-4xl cursor-pointer' onClick={(e)=> setDisplayMode(!displayMode)} />
                </div>
              </div>
              </div>
              <div className="w-full  px-4 py-3 ">
                <div className='datos'>
                <div className="form-group mb-6">
                  <input 
                  type="text" 
                  className="form-control block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                    id="exampleInput7"
                    placeholder="Titulo de tarea"
                    value={task.title}
                    onChange={(e)=>{setTask({...task, title: e.target.value})}}
                     />
                </div>
                <div className="form-group mb-6">
                  <textarea
                    className="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                    id="exampleFormControlTextarea13"
                    rows="3"
                    placeholder="Description de tarea"
                    value={task.description}
                    onChange={(e)=>{setTask({...task, description: e.target.value})}}
                ></textarea>
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
                
                </div>
              </div>
              </div>
            </div>
          </div>
                
          </div>
          
        )
      }
      
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4 px-5'>
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
  )
}

export default DashBoard;