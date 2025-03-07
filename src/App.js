import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { logout } from './services/api';

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
              <Home onLogout={handleLogout} />
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