/*
  Cliente.jsx

  Este componente representa el módulo de gestión
  de clientes del sistema Eco Vida.

  Permite consultar, registrar y actualizar clientes
  para usuarios autenticados.

  La eliminación de clientes está disponible
  únicamente para el Administrador.
*/

import { useEffect, useState } from 'react'

import {
  obtenerClientes,
  guardarCliente,
  actualizarCliente,
  eliminarCliente
} from '../services/ClienteService'

import '../styles/Cliente.css'

function Cliente() {

  /*
    Recuperamos el rol del usuario autenticado.
  */
  const rol = localStorage.getItem('rol')

  /*
    Determinamos si el usuario actual
    es Administrador.
  */
  const esAdministrador = rol === 'Administrador'

  /*
    Lista de clientes.
  */
  const [clientes, setClientes] = useState([])

  /*
    Identificador del cliente que se está editando.
  */
  const [idCliente, setIdCliente] = useState(null)

  /*
    Campos del formulario.
  */
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [tipoDocumento, setTipoDocumento] = useState('')
  const [numeroDocumento, setNumeroDocumento] = useState('')
  const [correoElectronico, setCorreoElectronico] = useState('')

  /*
    Carga los clientes al iniciar.
  */
  useEffect(() => {

    cargarClientes()

  }, [])

  /*
    Consulta los clientes registrados.
  */
  const cargarClientes = async () => {

    try {

      const datos = await obtenerClientes()

      setClientes(datos)

    } catch (error) {

      console.error(
        'Error al cargar clientes:',
        error
      )

    }

  }

  /*
    Limpia el formulario.
  */
  const limpiarFormulario = () => {

    setIdCliente(null)
    setNombres('')
    setApellidos('')
    setTipoDocumento('')
    setNumeroDocumento('')
    setCorreoElectronico('')

  }

  /*
    Guarda o actualiza un cliente.

    Tanto Usuario como Administrador
    pueden registrar y actualizar clientes.
  */
  const guardar = async () => {

    if (
      nombres === '' ||
      apellidos === '' ||
      tipoDocumento === '' ||
      numeroDocumento === ''
    ) {

      alert('Complete todos los campos obligatorios')

      return

    }

    try {

      const cliente = {

        nombres,
        apellidos,
        tipoDocumento,
        numeroDocumento,
        correoElectronico

      }

      if (idCliente === null) {

        await guardarCliente(cliente)

        alert('Cliente registrado correctamente')

      } else {

        await actualizarCliente(
          idCliente,
          cliente
        )

        alert('Cliente actualizado correctamente')

      }

      await cargarClientes()

      limpiarFormulario()

    } catch (error) {

      console.error(
        'Error al guardar cliente:',
        error
      )

      if (error.response?.status === 403) {

        alert(
          'No tienes permisos para realizar esta operación.'
        )

      } else {

        alert(
          'No fue posible guardar el cliente.'
        )

      }

    }

  }

  /*
    Carga un cliente en el formulario
    para su edición.
  */
  const editarCliente = (cliente) => {

    setIdCliente(cliente.id)

    setNombres(cliente.nombres || '')
    setApellidos(cliente.apellidos || '')
    setTipoDocumento(cliente.tipoDocumento || '')
    setNumeroDocumento(cliente.numeroDocumento || '')
    setCorreoElectronico(
      cliente.correoElectronico || ''
    )

  }

  /*
    Elimina un cliente.

    Esta operación solamente está disponible
    para el Administrador.
  */
  const borrarCliente = async (id) => {

    if (!esAdministrador) {

      return

    }

    const confirmar = window.confirm(
      '¿Desea eliminar este cliente?'
    )

    if (!confirmar) {

      return

    }

    try {

      await eliminarCliente(id)

      alert(
        'Cliente eliminado correctamente'
      )

      await cargarClientes()

    } catch (error) {

      console.error(
        'Error al eliminar cliente:',
        error
      )

      if (error.response?.status === 403) {

        alert(
          'No tienes permisos para eliminar clientes.'
        )

      } else {

        alert(
          'No fue posible eliminar el cliente.'
        )

      }

    }

  }

  return (

    <section>

      <h2>Módulo de Clientes</h2>

      <p>

        En este módulo se podrán registrar,
        consultar y actualizar clientes.

        {
          esAdministrador &&
          ' El Administrador también puede eliminar clientes.'
        }

      </p>

      <h3>

        {
          idCliente === null
            ? 'Registrar cliente'
            : 'Actualizar cliente'
        }

      </h3>

      <input
        type="text"
        placeholder="Nombres"
        value={nombres}
        onChange={(e) =>
          setNombres(e.target.value)
        }
      />

      <br /><br />

      <input
        type="text"
        placeholder="Apellidos"
        value={apellidos}
        onChange={(e) =>
          setApellidos(e.target.value)
        }
      />

      <br /><br />

      <input
        type="text"
        placeholder="Tipo de documento"
        value={tipoDocumento}
        onChange={(e) =>
          setTipoDocumento(e.target.value)
        }
      />

      <br /><br />

      <input
        type="text"
        placeholder="Número de documento"
        value={numeroDocumento}
        onChange={(e) =>
          setNumeroDocumento(e.target.value)
        }
      />

      <br /><br />

      <input
        type="email"
        placeholder="Correo electrónico"
        value={correoElectronico}
        onChange={(e) =>
          setCorreoElectronico(e.target.value)
        }
      />

      <br /><br />

      <button onClick={guardar}>

        {
          idCliente === null
            ? 'Guardar Cliente'
            : 'Actualizar Cliente'
        }

      </button>

      {
        idCliente !== null && (

          <button
            onClick={limpiarFormulario}
            style={{ marginLeft: '10px' }}
          >

            Cancelar

          </button>

        )
      }

      <hr />

      <h3>Listado de clientes</h3>

      <table border="1">

        <thead>

          <tr>

            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Documento</th>
            <th>Correo</th>
            <th>Acciones</th>

          </tr>

        </thead>

        <tbody>

          {

            clientes.map(cliente => (

              <tr key={cliente.id}>

                <td>{cliente.id}</td>

                <td>
                  {cliente.nombres}
                </td>

                <td>
                  {cliente.apellidos}
                </td>

                <td>
                  {cliente.numeroDocumento}
                </td>

                <td>
                  {cliente.correoElectronico}
                </td>

                <td>

                  {/* 
                    Usuario y Administrador
                    pueden editar.
                  */}
                  <button
                    onClick={() =>
                      editarCliente(cliente)
                    }
                  >

                    Editar

                  </button>


                  {/* 
                    Solamente el Administrador
                    puede eliminar.
                  */}
                  {
                    esAdministrador && (

                      <button
                        onClick={() =>
                          borrarCliente(cliente.id)
                        }
                        style={{
                          marginLeft: '10px'
                        }}
                      >

                        Eliminar

                      </button>

                    )
                  }

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </section>

  )

}

export default Cliente