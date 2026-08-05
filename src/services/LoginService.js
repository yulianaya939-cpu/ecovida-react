/*
  LoginService.js

  Servicio encargado de consumir
  el endpoint de autenticación
  del backend.
*/

import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/login";

export const iniciarSesion = async (credenciales) => {

    const respuesta = await axios.post(API_URL, credenciales);

    return respuesta.data;

};