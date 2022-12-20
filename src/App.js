import React from 'react';
import {createContext, useReducer } from 'react';
import './App.css';
import Header from './Components/Header';
import { app } from './firebase/firebase';
import { Routes, Route, Navigate} from "react-router-dom";
import DashBoard from './Components/DashBoard';
import Footer from './Components/Footer';
// Aqui declaro mi contexto
export const AppContext = createContext(null);





// Actions
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const GETTOKEN = 'GETTOKEN';
const GETUSER = 'GETUSER';
const GETLISTTASK = "GETLISTTASK";




// INITIAL STATE
const initialState = {
  isLogin: false,
  token: null,
  user:null,
  ListTask:[]
    
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
        case GETTOKEN:
          return {
            ...state,
            token: action.payload
          }

        case GETUSER:
          return{

            ...state,
            user: action.payload
          }
        case GETLISTTASK:
          return{

            ...state,
            ListTask: [...action.payload]
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
  console.log(state.isLogin, state.user, state.token, app)
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
        <Footer/>
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
