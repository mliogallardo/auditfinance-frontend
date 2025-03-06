import React, { useState } from 'react';
import './login.css'; // Crearemos este archivo después
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
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
        toast.success('Login exitoso'); // Notificación de éxito
        // Aquí puedes manejar el login exitoso
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
    </div>
  );
};

export default Login;