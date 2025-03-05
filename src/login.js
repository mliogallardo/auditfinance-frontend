import React, { useState } from 'react';
import './login.css'; // Crearemos este archivo después

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el login
    console.log('Email:', email);
    console.log('Password:', password);

    const rawData = {
      email: email, // email es el valor del estado
      password: password, // password es el valor del estado
    };
    e.preventDefault();
    try {
      const response = await fetch('localhost:8081/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indica que el cuerpo es JSON
        },
        body: JSON.stringify(rawData), // Convierte el objeto a una cadena JSON
      });
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const data = await response.json(); // Parsea la respuesta JSON
      console.log('Respuesta del servidor:', data);

      /*const data = await response.json();
      if (response.ok) {
        console.log('Login exitoso:', data);
        // Redirige al usuario o guarda el token de autenticación
      } else {
        console.error('Error en el login:', data.message);
      }*/
    } catch (error) {
      console.error('Error:', error);
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
    </div>
  );
};

export default Login;