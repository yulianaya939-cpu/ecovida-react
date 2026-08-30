/*
  ClienteService.js

  Servicio encargado de comunicarse con la API REST
  desarrollada en Spring Boot.

  Las solicitudes utilizan la instancia centralizada
  de Axios, que agrega automáticamente el JWT.
*/

import api from "./api";

const URL_CLIENTES = "/clientes";

/*
  Obtiene todos los clientes registrados.
*/
export const obtenerClientes = async () => {

  const respuesta = await api.get(URL_CLIENTES);

  return respuesta.data;

};

/*
  Registra un nuevo cliente.
*/
export const guardarCliente = async (cliente) => {

  const respuesta = await api.post(
    URL_CLIENTES,
    cliente
  );

  return respuesta.data;

};

/*
  Actualiza un cliente existente.
*/
export const actualizarCliente = async (id, cliente) => {

  const respuesta = await api.put(
    `${URL_CLIENTES}/${id}`,
    cliente
  );

  return respuesta.data;

};

/*
  Elimina un cliente por ID.
*/
export const eliminarCliente = async (id) => {

  await api.delete(
    `${URL_CLIENTES}/${id}`
  );

};