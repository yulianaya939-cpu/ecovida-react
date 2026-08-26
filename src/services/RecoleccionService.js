/*
  RecoleccionService.js

  Este archivo contiene las funciones encargadas
  de comunicarse con la API REST de recolecciones
  desarrollada en Spring Boot.

  Aquí se implementan las operaciones CRUD
  relacionadas con las recolecciones.
*/

// URL de la API REST de recolecciones.
const URL_RECOLECCIONES = 'http://localhost:8080/api/recolecciones'


/*
  Obtiene todas las recolecciones registradas.

  Método HTTP utilizado: GET
*/
export const obtenerRecolecciones = async () => {

  const respuesta = await fetch(URL_RECOLECCIONES)

  const datos = await respuesta.json()

  return datos
}


/*
  Registra una nueva recolección.

  Método HTTP utilizado: POST
*/
export const guardarRecoleccion = async (recoleccion) => {

  const respuesta = await fetch(URL_RECOLECCIONES, {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(recoleccion)

  })

  return await respuesta.json()
}


/*
  Actualiza una recolección existente.

  Método HTTP utilizado: PUT
*/
export const actualizarRecoleccion = async (id, recoleccion) => {

  const respuesta = await fetch(
    `${URL_RECOLECCIONES}/${id}`,
    {

      method: 'PUT',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(recoleccion)

    }
  )

  return await respuesta.json()
}


/*
  Elimina una recolección registrada.

  Método HTTP utilizado: DELETE
*/
export const eliminarRecoleccion = async (id) => {

  await fetch(
    `${URL_RECOLECCIONES}/${id}`,
    {
      method: 'DELETE'
    }
  )

}