import React,{ useContext } from 'react';
import { app } from '../firebase/firebase.js';
import { Link, useNavigate} from "react-router-dom";
import {GiCampfire} from "react-icons/gi";
import {AppContext} from "../App.js"
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import Swal from 'sweetalert2';



const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.languageCode = 'it';
// // To apply the default browser preference instead of explicitly setting it.
// // firebase.auth().useDeviceLanguage();

const Header = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(AppContext);
  
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

  const LogOutWithGoogle=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.

      dispatch({type:'LOGOUT'})
      navigate("/")
    }).catch((error) => {
      // An error happened.
    });
  }
  console.log(app)

  return (
    <header className='h-20 w-full shadow-lg  flex items-center justify-between px-3 fixed top-0 bg-white'>
        
        <Link to="/" className='flex items-center gap-2'>
          <GiCampfire className='text-3xl text-pink-600'/>
          <span className='text-pink-600'>FireShopping</span>
        </Link>
          
          {state.isLogin ? (
            <button onClick={(e)=> LogOutWithGoogle()} className='btn bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-200 hover:text-black transition'>
              LogOut
            </button>
          ) : (
            <button onClick={(e)=> LogWithGoogle()} className='btn bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-200 hover:text-black transition'>
              Login
            </button>
          )}
          
    </header>
  )
}

export default Header;