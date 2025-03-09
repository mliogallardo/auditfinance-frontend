
import axios from './axiosConfig'; // Importa la instancia configurada de Axios


// Uso de axios para hacer una solicitud protegida
export const getUserFriendList = async () => {
  try {
    const response = await axios.post(`friends/getUserFriendList`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error };
  }
};


/*export const getUserProfile = async (userId) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
      });

      return { success: true, data: response.data };
  } catch (error) {
      return { success: false, error };
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
      const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json',
          },
      });

      return { success: true, data: response.data };
  } catch (error) {
      return { success: false, error };
  }
};*/


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