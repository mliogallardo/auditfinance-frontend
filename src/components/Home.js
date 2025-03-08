import React, { useEffect, useState } from 'react';
//import React, { useEffect, useState } from 'react';
//import { getUsers } from '../services/api';

function Home({ onLogout }) {
  //const [users, setUsers] = useState([]);

  /*useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);*/

  return (
    <div>
      <h1>Bienvenido a la Pantalla Principal</h1>
      <p>Has iniciado sesión exitosamente.</p>
      <button onClick={onLogout}>Cerrar sesión</button>
      {
      /*<div>
        <h1>Users List</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>*/
      }
    </div>
  );
}

export default Home;