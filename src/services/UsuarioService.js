/*
  UsuarioService.js

  Servicio encargado de comunicarse con la API REST
  de usuarios desarrollada en Spring Boot.

  Las solicitudes utilizan la instancia centralizada
  de Axios, que agrega automáticamente el JWT.
*/

import api from "./api";

const API_URL = "/api/usuarios";

/*
  LISTAR
*/
export const obtenerUsuarios = async () => {

  const respuesta = await api.get(API_URL);

  return respuesta.data;

};

/*
  BUSCAR POR ID
*/
export const obtenerUsuario = async (id) => {

  const respuesta = await api.get(
    `${API_URL}/${id}`
  );

  return respuesta.data;

};

/*
  GUARDAR
*/
export const guardarUsuario = async (usuario) => {

  const respuesta = await api.post(
    API_URL,
    usuario
  );

  return respuesta.data;

};

/*
  ACTUALIZAR
*/
export const actualizarUsuario = async (id, usuario) => {

  const respuesta = await api.put(
    `${API_URL}/${id}`,
    usuario
  );

  return respuesta.data;

};

/*
  ELIMINAR
*/
export const eliminarUsuario = async (id) => {

  await api.delete(
    `${API_URL}/${id}`
  );

};