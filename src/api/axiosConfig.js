// src/api/axiosConfig.js
import axios from 'axios';

// Configura la URL base de la API
const API_BASE_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_BASE_URL;

// Configura headers comunes (por ejemplo, Content-Type)
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Interceptor para agregar el token de autenticación a las solicitudes
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores globales
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token inválido o expirado
            localStorage.removeItem('authToken'); // Elimina el token
            window.location.href = '/login'; // Redirige al usuario al login
        }
        return Promise.reject(error);
    }
);

export default axios;