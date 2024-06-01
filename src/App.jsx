import logo from './logo.svg';
import './App.css';
import Home from './Home';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import Login from './Login' 
function App() {
  return (
   <BrowserRouter>
<Routes>
  <Route path='/register' element={<Signup/>}></Route>
  <Route path='/login' element={<Login/>}></Route>
  <Route 
          path='/Home' 
          element={
            <div className="App">
              <Home />
            </div>
          } 
        />
        <Route path='/' element={<Navigate to='/Login' />} />
</Routes>
</BrowserRouter>
  );
}

export default App;
