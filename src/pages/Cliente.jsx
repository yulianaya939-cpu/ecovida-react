/*
  Cliente.jsx

  Este componente representa el módulo de gestión
  de clientes del sistema Eco Vida.

  Permite consultar, registrar, actualizar
  y eliminar clientes utilizando la API REST.
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

    const datos = await obtenerClientes()

    setClientes(datos)

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

      await actualizarCliente(idCliente, cliente)

      alert('Cliente actualizado correctamente')

    }

    cargarClientes()

    limpiarFormulario()

  }

  /*
    Carga un cliente en el formulario.
  */
  const editarCliente = (cliente) => {

    setIdCliente(cliente.id)

    setNombres(cliente.nombres)
    setApellidos(cliente.apellidos)
    setTipoDocumento(cliente.tipoDocumento)
    setNumeroDocumento(cliente.numeroDocumento)
    setCorreoElectronico(cliente.correoElectronico)

  }

  /*
    Elimina un cliente.
  */
  const borrarCliente = async (id) => {

    const confirmar = window.confirm(
      '¿Desea eliminar este cliente?'
    )

    if (!confirmar) {

      return

    }

    await eliminarCliente(id)

    cargarClientes()

  }

  return (

    <section>

      <h2>Módulo de Clientes</h2>

      <p>

        En este módulo se podrán registrar,
        consultar, actualizar y eliminar clientes.

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
        onChange={(e) => setNombres(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Apellidos"
        value={apellidos}
        onChange={(e) => setApellidos(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Tipo de documento"
        value={tipoDocumento}
        onChange={(e) => setTipoDocumento(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Número de documento"
        value={numeroDocumento}
        onChange={(e) => setNumeroDocumento(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Correo electrónico"
        value={correoElectronico}
        onChange={(e) => setCorreoElectronico(e.target.value)}
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
                <td>{cliente.nombres}</td>
                <td>{cliente.apellidos}</td>
                <td>{cliente.numeroDocumento}</td>
                <td>{cliente.correoElectronico}</td>

                <td>

                  <button
                    onClick={() => editarCliente(cliente)}
                  >

                    Editar

                  </button>

                  <button
                    onClick={() => borrarCliente(cliente.id)}
                    style={{ marginLeft: '10px' }}
                  >

                    Eliminar

                  </button>

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