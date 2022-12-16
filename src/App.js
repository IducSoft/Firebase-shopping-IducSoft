import React from 'react';
import {createContext, useReducer } from 'react';
import './App.css';
import Header from './Components/Header';
import { app } from './firebase/firebase';
import { Routes, Route, Navigate} from "react-router-dom";
import DashBoard from './Components/DashBoard';

// Aqui declaro mi contexto
export const AppContext = createContext(null);




// Actions
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';




// INITIAL STATE
const initialState = {
  isLogin: false,
    
}


// Reducer
const loginReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
              ...state,
              isLogin:true
            }
        case LOGOUT:
            return {
              ...state,
              isLogin:false
            }
        
        
        default:
          return{
            ...state
          }
          
    }
}

function App() {
  
  // const navigate = useNavigate();
  const [state, dispatch] = useReducer(loginReducer, initialState);
  console.log(state.isLogin, app)

  

  
  return (
    // Nuestra aplicacion esta encerrada en un contexto.
    <AppContext.Provider value={[state, dispatch]}>
      <div className="App">
        <Header/>
        <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/dashboard" element={<DashBoard/>} />
        <Route
          path="/"
          element={
            state.isLogin ? (
              <Navigate replace to="/dashboard" />
            ) : (
              <Home />
            )
          }
        />
        </Routes>
      </div>
    </AppContext.Provider>
    
  );
}



const Home =()=>{

  return (

    <div>Homme</div>
  )
}





export default App;
