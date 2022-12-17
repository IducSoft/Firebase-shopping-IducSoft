import React,{ useContext } from 'react';
import {AppContext} from "../App.js"

const DashBoard = () => {
  const [state] = useContext(AppContext);

  return (
    <div className='mt-20 bg-violet-300 px-4 py-3'>
      
      <div className='w-full text-left'>
      <h1>welcome to our App </h1>
        <span>
          <h1>{state.user.displayName}</h1>
        </span>
        {/* <img src={state.user.photoURL} alt='Img-profile'/> */}
      </div>
    </div>
  )
}

export default DashBoard