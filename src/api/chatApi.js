
import axios from './axiosConfig'; // Importa la instancia configurada de Axios


// Uso de axios para hacer una solicitud protegida
export const getPrivateChat = async (mail) => {
  try {
    const response = await axios.get(`chat/usuario/${mail}`);
    return { success: true, data: response.data.data };
  } catch (error) {
    return { success: false, error };
  }
};


export const sendMensaje = async ({ mailReceptor, mensaje }) => {
  try {
    console.log(mailReceptor+': '+mensaje)
    const response = await axios.post(`chat/usuario/send`, {
      mailReceptor: mailReceptor,
      mensaje: mensaje,
    }, {
      headers: {
        'Content-Type': 'application/json', // Indica que el cuerpo es JSON
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error };
  }
};


