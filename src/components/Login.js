import React, { useState } from 'react';
import './Login.css'; // Crearemos este archivo después
import axios from 'axios';
import { toast } from 'react-toastify';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/api/v1/auth/signin', {
        username: email, // Cambia "email" por "username"
        password,
    }, {
        headers: {
            'Content-Type': 'application/json', // Indica que el cuerpo es JSON
        },
    })
    .then(response => {
        console.log('Login exitoso:', response.data);
        const token = response.data.accessToken; 
        // Almacena el token en localStorage
        localStorage.setItem('authToken', token);

        // Configura axios para incluir el token en todas las solicitudes
        axios.interceptors.request.use((config) => {
          const token = localStorage.getItem('authToken');
          if (token) {
              config.headers['Authorization'] = `Bearer ${token}`;
              onLogin(true);
              toast.success('Iniciando sesión');
          }else{
            toast.error('No se ha podido guardar el token de sesión');//no deberíamos llegar aquí

          }
          return config;
        }, (error) => {
          return Promise.reject(error);
        });
 // Notificación de éxito
    })
    .catch(error => {
      if (error.response) {
          // El servidor respondió con un código de estado fuera del rango 2xx
          toast.error(error.response.data.error || 'Error en el login');
      } else if (error.request) {
          // La solicitud fue hecha pero no se recibió respuesta
          toast.error('No se recibió respuesta del servidor');
        } else {
          // Algo salió mal al hacer la solicitud
          toast.error('Error al hacer la solicitud: ' + error.message);
        }
    });
  };

  // Uso de axios para hacer una solicitud protegida
const getProtectedData = async () => {
  try {
      const response = await axios.get('http://localhost:8081/equipos/getAll');
      console.log('Datos protegidos:', response.data);
  } catch (error) {
      console.error('Error al obtener datos protegidos:', error.message);
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