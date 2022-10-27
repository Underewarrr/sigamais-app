import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Painel from './components/Painel';
import RegisterSocialMedia from './components/RegisterSocialMedia.jsx';

function App() {
  return (
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/painel" component={ Painel } />
        <Route exact path="/painel/cadastrar" component={ RegisterSocialMedia } />

      </Switch> 

  );
}

export default App;
