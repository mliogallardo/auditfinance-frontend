import React from 'react';
import Login from './login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import './App.css';

function App() {
  return (
    <div className="App">
      <Login />
      <ToastContainer />
    </div>
  );
}

export default App;