
import axios from './axiosConfig'; // Importa la instancia configurada de Axios

let requestInterceptor;


export const login = async ({ onLogin, email, password }) => {
  logout()
  try {
    const response = await axios.post(`api/v1/auth/signin`, {
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
