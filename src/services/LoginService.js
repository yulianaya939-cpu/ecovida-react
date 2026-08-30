/*
  LoginService.js

  Servicio encargado de consumir
  el endpoint de autenticación
  del backend.
*/

import api from "./api";

export const iniciarSesion = async (credenciales) => {

    const respuesta = await api.post(
        "/api/auth/login",
        credenciales
    );

    return respuesta.data;

};