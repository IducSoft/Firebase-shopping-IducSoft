import React,{ useContext } from 'react';
import {AppContext} from "../App.js"

const DashBoard = () => {
  const [state, dispatch] = useContext(AppContext);

  return (
    <div className='mt-20'>
      
      <div className='w-full'>
        <span>
          <img src={state.user.photoURL} alt="img-profile"/>
          <h1>{state.user.displayName}</h1>
        </span>
      </div>
    </div>
  )
}

export default DashBoard