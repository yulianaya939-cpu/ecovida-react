/*
  Residuos.jsx

  Este componente representa el módulo de gestión
  de residuos reciclables del sistema Eco Vida.

  Permite consultar, registrar y actualizar residuos.

  La eliminación de residuos está disponible
  únicamente para el Administrador.
*/

import { useEffect, useState } from 'react'


/*
  Importación de los servicios
  relacionados con residuos.
*/
import {
  obtenerResiduos,
  guardarResiduo,
  actualizarResiduo,
  eliminarResiduo
} from '../services/ResiduoService'


/*
  Importación del servicio
  encargado de consultar clientes.
*/
import {
  obtenerClientes
} from '../services/ClienteService'


function Residuos({ rol }) {

  /*
    Determina si el usuario actual
    tiene el rol de Administrador.
  */
  const esAdministrador = rol === 'Administrador'


  /*
    Lista de residuos registrados.
  */
  const [residuos, setResiduos] = useState([])


  /*
    Lista de clientes registrados.
  */
  const [clientes, setClientes] = useState([])


  /*
    Identificador del residuo
    que se encuentra en edición.
  */
  const [idResiduo, setIdResiduo] = useState(null)


  /*
    Campos del formulario.
  */
  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [unidadMedida, setUnidadMedida] = useState('')
  const [descripcion, setDescripcion] = useState('')


  /*
    Cliente asociado al residuo.
  */
  const [clienteId, setClienteId] = useState('')


  /*
    Carga inicial del componente.
  */
  useEffect(() => {

    cargarResiduos()

    cargarClientes()

  }, [])


  /*
    Consulta los residuos registrados.
  */
  const cargarResiduos = async () => {

    try {

      const datos = await obtenerResiduos()

      setResiduos(datos)

    } catch (error) {

      console.error(
        'Error al cargar residuos:',
        error
      )

      alert(
        'No fue posible cargar los residuos.'
      )

    }

  }


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
    Limpia todos los campos
    del formulario.
  */
  const limpiarFormulario = () => {

    setIdResiduo(null)

    setNombre('')
    setTipo('')
    setCantidad('')
    setUnidadMedida('')
    setDescripcion('')
    setClienteId('')

  }


  /*
    Guarda o actualiza un residuo.
  */
  const guardar = async () => {

    if (
      nombre === '' ||
      tipo === '' ||
      cantidad === '' ||
      clienteId === ''
    ) {

      alert(
        'Complete todos los campos obligatorios.'
      )

      return

    }


    /*
      Objeto enviado al backend.
    */
    const residuo = {

      nombre,
      tipo,
      cantidad,
      unidadMedida,
      descripcion,

      cliente: {
        id: Number(clienteId)
      }

    }


    try {

      /*
        Si no existe un ID,
        se registra un nuevo residuo.
      */
      if (idResiduo === null) {

        await guardarResiduo(residuo)

        alert(
          'Residuo registrado correctamente.'
        )

      } else {

        /*
          Si existe un ID,
          se actualiza el residuo seleccionado.
        */
        await actualizarResiduo(
          idResiduo,
          residuo
        )

        alert(
          'Residuo actualizado correctamente.'
        )

      }


      /*
        Actualiza el listado después
        de guardar los cambios.
      */
      await cargarResiduos()


      /*
        Limpia el formulario.
      */
      limpiarFormulario()

    } catch (error) {

      console.error(
        'Error al guardar residuo:',
        error
      )

      /*
        Muestra un mensaje cuando
        la operación no puede realizarse.
      */
      if (error.response?.status === 403) {

        alert(
          'No tienes permisos para realizar esta operación.'
        )

      } else {

        alert(
          'No fue posible guardar el residuo.'
        )

      }

    }

  }


  /*
    Carga un residuo en el formulario
    para su edición.
  */
  const editarResiduo = (residuo) => {

    setIdResiduo(residuo.id)

    setNombre(residuo.nombre || '')
    setTipo(residuo.tipo || '')
    setCantidad(residuo.cantidad || '')
    setUnidadMedida(residuo.unidadMedida || '')
    setDescripcion(residuo.descripcion || '')


    /*
      Carga el cliente asociado.
    */
    if (residuo.cliente) {

      setClienteId(residuo.cliente.id)

    } else {

      setClienteId('')

    }

  }


  /*
    Elimina un residuo registrado.

    Esta operación solamente puede ser
    ejecutada por un Administrador.
  */
  const borrarResiduo = async (id) => {

    /*
      Protección adicional en el frontend.
    */
    if (!esAdministrador) {

      return

    }


    const confirmar = window.confirm(
      '¿Desea eliminar este residuo?'
    )


    if (!confirmar) {

      return

    }


    try {

      await eliminarResiduo(id)

      alert(
        'Residuo eliminado correctamente.'
      )

      await cargarResiduos()

    } catch (error) {

      console.error(
        'Error al eliminar residuo:',
        error
      )


      /*
        Si Spring Boot rechaza la operación
        por permisos, se informa al usuario.
      */
      if (error.response?.status === 403) {

        alert(
          'No tienes permisos para eliminar residuos.'
        )

      } else {

        alert(
          'No fue posible eliminar el residuo.'
        )

      }

    }

  }


  return (

    <section>

      <h2>Módulo de Residuos</h2>


      <p>

        En este módulo se administran los residuos
        reciclables registrados por la empresa.

      </p>


      <h3>

        {
          idResiduo === null
            ? 'Registrar residuo'
            : 'Actualizar residuo'
        }

      </h3>


      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <br />
      <br />


      <input
        type="text"
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />

      <br />
      <br />


      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />

      <br />
      <br />


      <input
        type="text"
        placeholder="Unidad de medida"
        value={unidadMedida}
        onChange={(e) => setUnidadMedida(e.target.value)}
      />

      <br />
      <br />


      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <br />
      <br />


      {/* Cliente asociado al residuo */}

      <select
        value={clienteId}
        onChange={(e) => setClienteId(e.target.value)}
      >

        <option value="">
          Seleccione un cliente
        </option>


        {
          clientes.map(cliente => (

            <option
              key={cliente.id}
              value={cliente.id}
            >

              {cliente.nombres} {cliente.apellidos}

            </option>

          ))
        }

      </select>

      <br />
      <br />


      <button onClick={guardar}>

        {
          idResiduo === null
            ? 'Guardar Residuo'
            : 'Actualizar Residuo'
        }

      </button>


      {
        idResiduo !== null && (

          <button
            onClick={limpiarFormulario}
            style={{ marginLeft: '10px' }}
          >

            Cancelar

          </button>

        )
      }


      <hr />


      <h3>
        Listado de residuos
      </h3>


      <table border="1">

        <thead>

          <tr>

            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Cliente</th>
            <th>Acciones</th>

          </tr>

        </thead>


        <tbody>

          {
            residuos.map(residuo => (

              <tr key={residuo.id}>

                <td>
                  {residuo.id}
                </td>

                <td>
                  {residuo.nombre}
                </td>

                <td>
                  {residuo.tipo}
                </td>

                <td>
                  {residuo.cantidad}
                </td>

                <td>
                  {residuo.unidadMedida}
                </td>


                <td>

                  {
                    residuo.cliente
                      ? `${residuo.cliente.nombres} ${residuo.cliente.apellidos}`
                      : 'Sin cliente'
                  }

                </td>


                <td>

                  {/* 
                    El botón Editar está disponible
                    para todos los usuarios autenticados.
                  */}
                  <button
                    onClick={() =>
                      editarResiduo(residuo)
                    }
                  >

                    Editar

                  </button>


                  {/*
                    El botón Eliminar solamente
                    aparece para el Administrador.
                  */}
                  {
                    esAdministrador && (

                      <button
                        onClick={() =>
                          borrarResiduo(residuo.id)
                        }
                        style={{ marginLeft: '10px' }}
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


export default Residuos