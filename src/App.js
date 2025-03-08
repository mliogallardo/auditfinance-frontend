import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import { logout } from './api'; // Importa desde el archivo index.js

// Carga las variables de entorno según el modo
/*
npm start: Ejecuta la aplicación en modo desarrollo (usa .env.development).
npm run start:staging: Ejecuta la aplicación en modo staging (usa .env.staging).
npm run build: Crea un build para producción (usa .env.production).
npm run build:staging: Crea un build para staging (usa .env.staging).
*/

const API_BASE_URL = process.env.REACT_APP_API_URL;
const APP_MODE = process.env.REACT_APP_MODE;

console.log(`API Base URL: ${API_BASE_URL}`);
console.log(`App Mode: ${APP_MODE}`);

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = (status) => {
    console.log("Estado hadlelogin "+status)
    setIsAuthenticated(status);
  };
  
  const handleLogout = () => {
    logout()
    /*
    // 3. Redirige al usuario
    const navigate = useNavigate();
    navigate('/login'); // Redirige a la página de login
    */
    setIsAuthenticated(false);
  };

  return (
    
    <div>
      <div>
      <ToastContainer /> 
      </div>
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              //<HomePage onLogout={handleLogout} />
              <HomePage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;