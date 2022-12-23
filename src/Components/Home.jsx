import React, {useContext, useEffect} from 'react';
import ImageNote from "../images/publicalo.png";
import ImageGoogle from "../images/simbolo-de-google.png";
import { app } from '../firebase/firebase.js';
import { GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import Swal from 'sweetalert2';
import {AppContext} from "../App.js";
// import {useNavigate} from "react-router-dom";
import { LocalStoragePersistence } from '../LocalStoragePersistence';

const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.languageCode = 'it';
// // To apply the default browser preference instead of explicitly setting it.
// // firebase.auth().useDeviceLanguage();

const Home = () => {

  // const navigate = useNavigate();
  const [state, dispatch] = useContext(AppContext);

  // Vamos a determinar las funcionalidades

  const buscarLocalStorage =()=>{

    let datoEnLocalStorage = null;

    if(localStorage.getItem("userGmail")){

      datoEnLocalStorage = JSON.parse(localStorage.getItem("userGmail"))
      dispatch({type:'LOGIN'})
      dispatch({type: 'GETTOKEN', payload:datoEnLocalStorage.token})
      dispatch({type: 'GETUSER', payload: datoEnLocalStorage.dataUser})
    }

    
  }

  useEffect(() => {
    
    buscarLocalStorage()
    // eslint-disable-next-line
  }, [])


  const LogWithGoogle =()=>{
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            Swal.fire(
              `${user.displayName}`,
              'you have successfully authenticated',
              'success'
            )
            dispatch({type:'LOGIN'})
            dispatch({type: 'GETTOKEN', payload: token})
            dispatch({type: 'GETUSER', payload: user})
            LocalStoragePersistence(user, token, credential);
            // console.log(token, user)
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(email, credential)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Something went wrong! ${errorMessage}, ${errorCode}`,
            })
            // ...
        });
  }

  console.log(app,state)
  return (
        <div className='images-container'>
            <img src={ImageNote} alt="note" className='' />
            <h1 className='text-5xl mb-5 text-white font-bold'>App Notes</h1>
            <button onClick={(e)=> LogWithGoogle()} className='btn btn-google bg-white hover:bg-violet-500 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded'>
                <img src={ImageGoogle} alt="note" className='w-8 mx-3' />
                Sign in
            </button>
            <p className='link-to-github'>Developed By <span className='ml-2'><a href='https://github.com/IducSoft' className='text-black bg-white px-2 py-1 rounded' target="_blank" rel="noreferrer">Isaac Urdaneta</a></span></p>
        </div>
    
  )
}

export default Home;