import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:8081';
let requestInterceptor;

export const login = async ({ onLogin,email, password }) => {
    let isLogged = false;

    axios.post(`${API_BASE_URL}/api/v1/auth/signin`, {
        username: email, // Cambia "email" por "username"
        password,
    }, {
        headers: {
            'Content-Type': 'application/json', // Indica que el cuerpo es JSON
        },
    })
        .then(response => {
            const token = response.data.accessToken;
            // Almacena el token en localStorage
            localStorage.setItem('authToken', token);

            // Configura el interceptor al iniciar la aplicación / incluir el token en todas las solicitudes
            requestInterceptor = axios.interceptors.request.use((config) => {
                //entra cuando se llama a axios
                const token = localStorage.getItem('authToken');
                config.headers['Authorization'] = `Bearer ${token}`;

            }, (error) => {
                console.log(`error axios token: ${error}`)
            });
            isLogged = true;
            onLogin(true)
            return { success: isLogged, error: "Sin errores" };
        })
        .catch(error => {
            if (error.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                console.log(`Error1: ${error.response}`)
                return { success: false, error: error.response };
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.log(`Error2: ${error.request}`)
                return { success: false, error: 'No se recibió respuesta del servidor' };
            } else {
                // Algo salió mal al hacer la solicitud
                console.log(`Error3: ${error.message}`)
                return { success: false, error: error.message };
            }
        });
};

export const logout = () => {
    // 1. Elimina el token
    localStorage.removeItem('authToken');

    // 2. Expulsa el interceptor
    axios.interceptors.request.eject(requestInterceptor);
};

/*export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};*/

/*export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user');
  }
};*/

/*export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error creating user');
  }
};*/