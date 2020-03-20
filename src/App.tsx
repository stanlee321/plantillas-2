import React from 'react';

import {BrowserRouter, Route, Switch } from 'react-router-dom';

import { SignIn } from './pages/Login';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';

import { NotFound } from './pages/404';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn}/>
        <Route path="/login" exact component={SignIn}/>
        <Route path="/dashboard" exact component={Dashboard}/>
        <Route path="/" render={ () => <NotFound/>}/>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
