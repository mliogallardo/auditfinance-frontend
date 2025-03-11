
import axios from './axiosConfig'; // Importa la instancia configurada de Axios


// Uso de axios para hacer una solicitud protegida
export const getPrivateChat = async (mail) => {
  try {
    const response = await axios.get(`chat/usuario/${mail}`);
    return { success: true, data: response.data.data.chat };
  } catch (error) {
    return { success: false, error };
  }
};

