import React from 'react';

function Home({ onLogout }) {
  return (
    <div>
      <h1>Bienvenido a la Pantalla Principal</h1>
      <p>Has iniciado sesión exitosamente.</p>
      <button onClick={onLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Home;