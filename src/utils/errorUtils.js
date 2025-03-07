export const getErrorMessage = (error) => {
    if (typeof error === 'string') {
        // Si el error es una cadena, devuélvelo directamente
        return error;
    } else if (error?.response?.data?.error) {
        // Si el error es una respuesta de axios con un mensaje en la propiedad `error`
        return error.response.data.error;
    } else if (error?.response?.data?.message) {
        // Si el error es una respuesta de axios con un mensaje en la propiedad `message`
        return error.response.data.message;
    } else if (error?.message) {
        // Si el error es un objeto de JavaScript con una propiedad `message`
        return error.message;
    } else if (error?.response?.data) {
        // Si el error es una respuesta de axios con datos en el cuerpo
        return JSON.stringify(error.response.data);
    } else if (error?.request) {
        // Si el error es debido a una solicitud sin respuesta (error de red)
        return 'No se recibió respuesta del servidor';
    } else {
        // Si no se puede determinar el tipo de error
        return 'Error desconocido';
    }
};