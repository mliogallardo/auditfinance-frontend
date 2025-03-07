import React, { useState } from 'react';
import './Login.css'; // Crearemos este archivo después
import { login } from '../services/api';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../utils/errorUtils'; 

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /*ToDo Interceptores y configuración global: Si usas axios, puedes configurar interceptores 
  y configuraciones globales (como headers comunes) en un archivo de configuración separado.*/

  /*ToDo Organización: Si tu aplicación es grande, podrías dividir las llamadas a la API en 
  múltiples archivos según el contexto (por ejemplo, userApi.js, productApi.js, etc.) 
  y luego importarlos en un archivo index.js para exportarlos todos juntos.*/

  // Uso de axios para hacer una solicitud protegida
  /*const getProtectedData = async () => {
    try {
        const response = await axios.get('http://localhost:8081/equipos/getAll');
        console.log('Datos protegidos:', response.data);
    } catch (error) {
        console.error('Error al obtener datos protegidos:', error.message);
    }
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await login({ onLogin, email, password });
        if (response.success) {
            console.log("Login exitoso:", response);
            onLogin(true); // Notifica que el login fue exitoso
        } else {
          const errorMessage = getErrorMessage(response.error);
          toast.error(`Error en el login: ${errorMessage}`);
        }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Error inesperado: ${errorMessage}`);
    }
};

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
      {
        //<span onClick={getProtectedData}>"Hola"</span>
      }
    </div>
  );
};

export default Login;