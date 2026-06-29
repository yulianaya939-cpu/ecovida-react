/*
  ClienteService.js

  Este archivo contiene las funciones encargadas
  de comunicarse con la API REST desarrollada
  en Spring Boot.

  Aquí se implementan las operaciones CRUD
  relacionadas con los clientes.
*/

const URL_CLIENTES = 'http://localhost:8080/clientes'

/*
  Obtiene todos los clientes registrados.
*/
export const obtenerClientes = async () => {

  const respuesta = await fetch(URL_CLIENTES)

  const datos = await respuesta.json()

  return datos

}

/*
  Registra un nuevo cliente.
*/
export const guardarCliente = async (cliente) => {

  const respuesta = await fetch(URL_CLIENTES, {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(cliente)

  })

  return await respuesta.json()

}

/*
  Actualiza un cliente existente.
*/
export const actualizarCliente = async (id, cliente) => {

  const respuesta = await fetch(`${URL_CLIENTES}/${id}`, {

    method: 'PUT',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(cliente)

  })

  return await respuesta.json()

}

/*
  Elimina un cliente por ID.
*/
export const eliminarCliente = async (id) => {

  await fetch(`${URL_CLIENTES}/${id}`, {

    method: 'DELETE'

  })

}