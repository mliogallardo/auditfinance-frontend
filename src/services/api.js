import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:8081';
let requestInterceptor;


export const login = async ({ onLogin, email, password }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/signin`, {
            username: email, // Cambia "email" por "username"
            password,
        }, {
            headers: {
                'Content-Type': 'application/json', // Indica que el cuerpo es JSON
            },
        });
        const token = response.data.accessToken;
        localStorage.setItem('authToken', token); // Almacena el token en localStorage
        // Configura el interceptor para incluir el token en todas las solicitudes futuras
        requestInterceptor = axios.interceptors.request.use((config) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject({ success: false, error });
        });

        onLogin(true); // Notifica que el login fue exitoso
        return { success: true }; // Devuelve un objeto indicando éxito, por ahora no vamos a devolver nada para no pasear el token
    } catch (error) {
        return { success: false, error };
    }
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