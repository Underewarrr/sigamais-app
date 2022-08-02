import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login } from './pages';
import { BrowserRouter } from 'react-router-dom';

function App() {
 
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={ Login } />
    </Switch> 
    </BrowserRouter>
  );
}

export default App;
