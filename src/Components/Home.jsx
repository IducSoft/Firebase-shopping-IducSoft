import React from 'react';
import ImageNote from "../images/publicalo.png";
import ImageGoogle from "../images/simbolo-de-google.png";

const Home = () => {

  return (

    
        <div className='images-container'>
            
            
            <img src={ImageNote} alt="note" className='' />

            <h1 className='text-5xl mb-5 text-white font-bold'>App Notes</h1>
            <button className='btn btn-google bg-white hover:bg-violet-500 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded'>
                <img src={ImageGoogle} alt="note" className='w-8 mx-3' />
                Sign in
            </button>

            <p className='link-to-github'>Developed By <span><a href='https://github.com/IducSoft' className='text-black ' target="_blank" rel="noreferrer">Isaac Urdaneta</a></span></p>
            
        </div>
    
  )
}

export default Home;