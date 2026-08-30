/*
  RecoleccionService.js

  Este archivo contiene las funciones encargadas
  de comunicarse con la API REST de recolecciones
  desarrollada en Spring Boot.

  Aquí se implementan las operaciones CRUD
  relacionadas con las recolecciones.

  Las solicitudes utilizan la instancia centralizada
  de Axios, que agrega automáticamente el JWT
  almacenado en localStorage.
*/

import api from "./api";

// URL relativa de la API REST de recolecciones.
// La URL base http://localhost:8080 está configurada
// en el archivo api.js.
const URL_RECOLECCIONES = "/api/recolecciones";


/*
  Obtiene todas las recolecciones registradas.

  Método HTTP utilizado: GET

  El JWT se agrega automáticamente mediante
  el interceptor configurado en api.js.
*/
export const obtenerRecolecciones = async () => {

  const respuesta = await api.get(
    URL_RECOLECCIONES
  );

  return respuesta.data;
};


/*
  Registra una nueva recolección.

  Método HTTP utilizado: POST

  El objeto recoleccion contiene la información
  que será enviada al backend.
*/
export const guardarRecoleccion = async (recoleccion) => {

  const respuesta = await api.post(
    URL_RECOLECCIONES,
    recoleccion
  );

  return respuesta.data;
};


/*
  Actualiza una recolección existente.

  Método HTTP utilizado: PUT

  Se utiliza el ID para identificar la recolección
  que será modificada.
*/
export const actualizarRecoleccion = async (
  id,
  recoleccion
) => {

  const respuesta = await api.put(
    `${URL_RECOLECCIONES}/${id}`,
    recoleccion
  );

  return respuesta.data;
};


/*
  Elimina una recolección registrada.

  Método HTTP utilizado: DELETE

  Se utiliza el ID para identificar la recolección
  que será eliminada.
*/
export const eliminarRecoleccion = async (id) => {

  await api.delete(
    `${URL_RECOLECCIONES}/${id}`
  );

};