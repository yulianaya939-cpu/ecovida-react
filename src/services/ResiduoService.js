/*
  ResiduoService.js

  Servicio encargado de comunicarse con la API REST
  de residuos desarrollada en Spring Boot.

  Las solicitudes utilizan la instancia centralizada
  de Axios, que agrega automáticamente el JWT.
*/

import api from "./api";

const URL_RESIDUOS = "/residuos";

/*
  Obtiene todos los residuos registrados.
*/
export const obtenerResiduos = async () => {

  const respuesta = await api.get(URL_RESIDUOS);

  return respuesta.data;

};

/*
  Registra un nuevo residuo.
*/
export const guardarResiduo = async (residuo) => {

  const respuesta = await api.post(
    URL_RESIDUOS,
    residuo
  );

  return respuesta.data;

};

/*
  Actualiza un residuo existente.
*/
export const actualizarResiduo = async (id, residuo) => {

  const respuesta = await api.put(
    `${URL_RESIDUOS}/${id}`,
    residuo
  );

  return respuesta.data;

};

/*
  Elimina un residuo por ID.
*/
export const eliminarResiduo = async (id) => {

  await api.delete(
    `${URL_RESIDUOS}/${id}`
  );

};