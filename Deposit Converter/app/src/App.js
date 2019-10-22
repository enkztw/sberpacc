import './css/App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Deposits from './components/Deposits';
import Calculator from './components/Calculator';


export default function Board() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Deposits} />
      <Route path='/calculator/:name' component={Calculator} />
    </BrowserRouter>
  )
}



