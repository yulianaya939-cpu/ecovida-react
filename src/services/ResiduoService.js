/*
  ResiduoService.js

  Este archivo contiene las funciones encargadas
  de comunicarse con la API REST de residuos
  desarrollada en Spring Boot.

  Aquí se implementan las operaciones CRUD
  relacionadas con los residuos.
*/

const URL_RESIDUOS = 'http://localhost:8080/residuos'

/*
  Obtiene todos los residuos registrados.
*/
export const obtenerResiduos = async () => {

  const respuesta = await fetch(URL_RESIDUOS)

  const datos = await respuesta.json()

  return datos

}

/*
  Registra un nuevo residuo.
*/
export const guardarResiduo = async (residuo) => {

  const respuesta = await fetch(URL_RESIDUOS, {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(residuo)

  })

  return await respuesta.json()

}

/*
  Actualiza un residuo existente.
*/
export const actualizarResiduo = async (id, residuo) => {

  const respuesta = await fetch(`${URL_RESIDUOS}/${id}`, {

    method: 'PUT',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(residuo)

  })

  return await respuesta.json()

}

/*
  Elimina un residuo por ID.
*/
export const eliminarResiduo = async (id) => {

  await fetch(`${URL_RESIDUOS}/${id}`, {

    method: 'DELETE'

  })

}