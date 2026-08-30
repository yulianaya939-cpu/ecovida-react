/*
  Recolecciones.jsx

  Este componente representa el módulo de gestión
  de recolecciones del sistema Eco Vida.

  Permite consultar, registrar y actualizar
  recolecciones para usuarios autenticados.

  La eliminación de recolecciones está disponible
  únicamente para el Administrador.

  Cada recolección se relaciona con un cliente
  y con un residuo registrado en el sistema.
*/

import { useEffect, useState } from 'react'

/*
  Importación de los servicios relacionados
  con las recolecciones.
*/
import {
  obtenerRecolecciones,
  guardarRecoleccion,
  actualizarRecoleccion,
  eliminarRecoleccion
} from '../services/RecoleccionService'

/*
  Importación del servicio encargado
  de consultar los clientes.
*/
import {
  obtenerClientes
} from '../services/ClienteService'

/*
  Importación del servicio encargado
  de consultar los residuos.
*/
import {
  obtenerResiduos
} from '../services/ResiduoService'


function Recolecciones() {

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
    Lista de recolecciones registradas.
  */
  const [recolecciones, setRecolecciones] = useState([])


  /*
    Lista de clientes registrados.
  */
  const [clientes, setClientes] = useState([])


  /*
    Lista de residuos registrados.
  */
  const [residuos, setResiduos] = useState([])


  /*
    Identificador de la recolección
    que se encuentra en edición.
  */
  const [idRecoleccion, setIdRecoleccion] = useState(null)


  /*
    Campos del formulario.
  */
  const [fecha, setFecha] = useState('')
  const [departamento, setDepartamento] = useState('')
  const [municipio, setMunicipio] = useState('')
  const [estado, setEstado] = useState('Pendiente')


  /*
    Identificadores del cliente
    y residuo asociados.
  */
  const [clienteId, setClienteId] = useState('')
  const [residuoId, setResiduoId] = useState('')


  /*
    Carga inicial de información
    cuando se abre el módulo.
  */
  useEffect(() => {

    cargarRecolecciones()
    cargarClientes()
    cargarResiduos()

  }, [])


  /*
    Consulta las recolecciones registradas
    en el backend.
  */
  const cargarRecolecciones = async () => {

    try {

      const datos = await obtenerRecolecciones()

      setRecolecciones(datos)

    } catch (error) {

      console.error(
        'Error al cargar recolecciones:',
        error
      )

    }

  }


  /*
    Consulta los clientes registrados
    en el backend.
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
    Consulta los residuos registrados
    en el backend.
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

    }

  }


  /*
    Limpia los campos del formulario
    y cancela el modo de edición.
  */
  const limpiarFormulario = () => {

    setIdRecoleccion(null)

    setFecha('')
    setDepartamento('')
    setMunicipio('')
    setEstado('Pendiente')

    setClienteId('')
    setResiduoId('')

  }


  /*
    Guarda una nueva recolección
    o actualiza una existente.

    Tanto Usuario como Administrador
    pueden registrar y actualizar recolecciones.
  */
  const guardar = async () => {

    /*
      Verifica que todos los campos
      necesarios hayan sido diligenciados.
    */
    if (
      fecha === '' ||
      departamento === '' ||
      municipio === '' ||
      estado === '' ||
      clienteId === '' ||
      residuoId === ''
    ) {

      alert(
        'Complete todos los campos obligatorios.'
      )

      return

    }


    /*
      Objeto que se enviará al backend.

      Las propiedades cliente y residuo
      permiten establecer la relación
      entre las entidades.
    */
    const recoleccion = {

      fecha,

      departamento,

      municipio,

      estado,

      cliente: {
        id: Number(clienteId)
      },

      residuo: {
        id: Number(residuoId)
      }

    }


    try {

      /*
        Si no existe un ID se registra
        una nueva recolección.
      */
      if (idRecoleccion === null) {

        await guardarRecoleccion(
          recoleccion
        )

        alert(
          'Recolección registrada correctamente.'
        )

      } else {

        /*
          Si existe un ID se actualiza
          la recolección seleccionada.
        */
        await actualizarRecoleccion(
          idRecoleccion,
          recoleccion
        )

        alert(
          'Recolección actualizada correctamente.'
        )

      }


      /*
        Actualiza el listado después
        de guardar la información.
      */
      await cargarRecolecciones()

      limpiarFormulario()

    } catch (error) {

      console.error(
        'Error al guardar recolección:',
        error
      )

      if (error.response?.status === 403) {

        alert(
          'No tienes permisos para realizar esta operación.'
        )

      } else {

        alert(
          'No fue posible guardar la recolección.'
        )

      }

    }

  }


  /*
    Carga una recolección existente
    dentro del formulario para editarla.
  */
  const editarRecoleccion = (recoleccion) => {

    setIdRecoleccion(recoleccion.id)

    setFecha(recoleccion.fecha || '')
    setDepartamento(
      recoleccion.departamento || ''
    )
    setMunicipio(
      recoleccion.municipio || ''
    )
    setEstado(
      recoleccion.estado || 'Pendiente'
    )


    /*
      Carga el cliente asociado
      a la recolección.
    */
    if (recoleccion.cliente) {

      setClienteId(
        recoleccion.cliente.id
      )

    } else {

      setClienteId('')

    }


    /*
      Carga el residuo asociado
      a la recolección.
    */
    if (recoleccion.residuo) {

      setResiduoId(
        recoleccion.residuo.id
      )

    } else {

      setResiduoId('')

    }

  }


  /*
    Elimina una recolección.

    Esta operación solamente está disponible
    para el Administrador.
  */
  const borrarRecoleccion = async (id) => {

    if (!esAdministrador) {

      return

    }


    const confirmar = window.confirm(
      '¿Desea eliminar esta recolección?'
    )

    if (!confirmar) {

      return

    }


    try {

      await eliminarRecoleccion(id)

      alert(
        'Recolección eliminada correctamente.'
      )

      await cargarRecolecciones()

    } catch (error) {

      console.error(
        'Error al eliminar recolección:',
        error
      )

      if (error.response?.status === 403) {

        alert(
          'No tienes permisos para eliminar recolecciones.'
        )

      } else {

        alert(
          'No fue posible eliminar la recolección.'
        )

      }

    }

  }


  return (

    <section>

      <h2>Módulo de Recolecciones</h2>

      <p>

        En este módulo se administran las
        recolecciones de residuos reciclables
        registradas por la empresa.

        {
          esAdministrador &&
          ' El Administrador también puede eliminar recolecciones.'
        }

      </p>


      <h3>

        {
          idRecoleccion === null
            ? 'Registrar recolección'
            : 'Actualizar recolección'
        }

      </h3>


      {/* Fecha de la recolección */}

      <input
        type="date"
        value={fecha}
        onChange={(e) =>
          setFecha(e.target.value)
        }
      />

      <br /><br />


      {/* Departamento */}

      <input
        type="text"
        placeholder="Departamento"
        value={departamento}
        onChange={(e) =>
          setDepartamento(e.target.value)
        }
      />

      <br /><br />


      {/* Municipio */}

      <input
        type="text"
        placeholder="Municipio"
        value={municipio}
        onChange={(e) =>
          setMunicipio(e.target.value)
        }
      />

      <br /><br />


      {/* Estado de la recolección */}

      <select
        value={estado}
        onChange={(e) =>
          setEstado(e.target.value)
        }
      >

        <option value="Pendiente">
          Pendiente
        </option>

        <option value="Programada">
          Programada
        </option>

        <option value="Realizada">
          Realizada
        </option>

        <option value="Cancelada">
          Cancelada
        </option>

      </select>

      <br /><br />


      {/* Cliente asociado */}

      <select
        value={clienteId}
        onChange={(e) =>
          setClienteId(e.target.value)
        }
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

      <br /><br />


      {/* Residuo asociado */}

      <select
        value={residuoId}
        onChange={(e) =>
          setResiduoId(e.target.value)
        }
      >

        <option value="">
          Seleccione un residuo
        </option>

        {

          residuos.map(residuo => (

            <option
              key={residuo.id}
              value={residuo.id}
            >

              {residuo.nombre}

            </option>

          ))

        }

      </select>

      <br /><br />


      {/* Botón para guardar o actualizar */}

      <button onClick={guardar}>

        {
          idRecoleccion === null
            ? 'Guardar Recolección'
            : 'Actualizar Recolección'
        }

      </button>


      {/* Botón para cancelar la edición */}

      {
        idRecoleccion !== null && (

          <button
            onClick={limpiarFormulario}
            style={{
              marginLeft: '10px'
            }}
          >

            Cancelar

          </button>

        )
      }


      <hr />


      <h3>Listado de recolecciones</h3>


      <table border="1">

        <thead>

          <tr>

            <th>ID</th>
            <th>Fecha</th>
            <th>Departamento</th>
            <th>Municipio</th>
            <th>Estado</th>
            <th>Cliente</th>
            <th>Residuo</th>
            <th>Acciones</th>

          </tr>

        </thead>


        <tbody>

          {

            recolecciones.map(
              recoleccion => (

                <tr
                  key={recoleccion.id}
                >

                  <td>
                    {recoleccion.id}
                  </td>

                  <td>
                    {recoleccion.fecha}
                  </td>

                  <td>
                    {recoleccion.departamento}
                  </td>

                  <td>
                    {recoleccion.municipio}
                  </td>

                  <td>
                    {recoleccion.estado}
                  </td>

                  <td>

                    {

                      recoleccion.cliente

                        ? `${recoleccion.cliente.nombres} ${recoleccion.cliente.apellidos}`

                        : 'Sin cliente'

                    }

                  </td>

                  <td>

                    {

                      recoleccion.residuo

                        ? recoleccion.residuo.nombre

                        : 'Sin residuo'

                    }

                  </td>

                  <td>

                    {/* 
                      Usuario y Administrador
                      pueden editar.
                    */}

                    <button
                      onClick={() =>
                        editarRecoleccion(
                          recoleccion
                        )
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
                            borrarRecoleccion(
                              recoleccion.id
                            )
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

              )
            )

          }

        </tbody>

      </table>

    </section>

  )

}


export default Recolecciones