import axios from "axios";

const API_URL = "http://localhost:8080/api/usuarios";

// LISTAR
export const obtenerUsuarios = async () => {
    const respuesta = await axios.get(API_URL);
    return respuesta.data;
};

// BUSCAR POR ID
export const obtenerUsuario = async (id) => {
    const respuesta = await axios.get(`${API_URL}/${id}`);
    return respuesta.data;
};

// GUARDAR
export const guardarUsuario = async (usuario) => {
    const respuesta = await axios.post(API_URL, usuario);
    return respuesta.data;
};

// ACTUALIZAR
export const actualizarUsuario = async (id, usuario) => {
    const respuesta = await axios.put(`${API_URL}/${id}`, usuario);
    return respuesta.data;
};

// ELIMINAR
export const eliminarUsuario = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};