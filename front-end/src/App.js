import './App.css';
import { Login } from "./pages";
import React, { createContext } from 'react';

const context = createContext();

function App() {
  const theme = 'light';


  return (
   
    <div className="App">
     <Login theme={ theme }/>
    </div>
  
  );
}

export default App;
