/*
  Residuos.jsx

  Este componente representa el módulo de gestión
  de residuos reciclables del sistema Eco Vida.

  Permite consultar, registrar, actualizar
  y eliminar residuos utilizando la API REST.
*/

import { useEffect, useState } from 'react'

import {
  obtenerResiduos,
  guardarResiduo,
  actualizarResiduo,
  eliminarResiduo
} from '../services/ResiduoService'

import '../styles/Residuos.css'

function Residuos() {

  /*
    Lista de residuos.
  */
  const [residuos, setResiduos] = useState([])

  /*
    Identificador del residuo que se está editando.
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
    Carga los residuos al iniciar.
  */
  useEffect(() => {

    cargarResiduos()

  }, [])

  /*
    Consulta los residuos registrados.
  */
  const cargarResiduos = async () => {

    const datos = await obtenerResiduos()

    setResiduos(datos)

  }

  /*
    Limpia el formulario.
  */
  const limpiarFormulario = () => {

    setIdResiduo(null)

    setNombre('')
    setTipo('')
    setCantidad('')
    setUnidadMedida('')
    setDescripcion('')

  }

  /*
    Guarda o actualiza un residuo.
  */
  const guardar = async () => {

    if (
      nombre === '' ||
      tipo === '' ||
      cantidad === ''
    ) {

      alert('Complete los campos obligatorios')

      return

    }

    const residuo = {

      nombre,
      tipo,
      cantidad,
      unidadMedida,
      descripcion

    }

    if (idResiduo === null) {

      await guardarResiduo(residuo)

      alert('Residuo registrado correctamente')

    } else {

      await actualizarResiduo(idResiduo, residuo)

      alert('Residuo actualizado correctamente')

    }

    cargarResiduos()

    limpiarFormulario()

  }

  /*
    Carga un residuo en el formulario.
  */
  const editarResiduo = (residuo) => {

    setIdResiduo(residuo.id)

    setNombre(residuo.nombre)
    setTipo(residuo.tipo)
    setCantidad(residuo.cantidad)
    setUnidadMedida(residuo.unidadMedida)
    setDescripcion(residuo.descripcion)

  }

  /*
    Elimina un residuo.
  */
  const borrarResiduo = async (id) => {

    const confirmar = window.confirm(
      '¿Desea eliminar este residuo?'
    )

    if (!confirmar) {

      return

    }

    await eliminarResiduo(id)

    cargarResiduos()

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

      <br /><br />

      <input
        type="text"
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Unidad de medida"
        value={unidadMedida}
        onChange={(e) => setUnidadMedida(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <br /><br />

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

      <h3>Listado de residuos</h3>

      <table border="1">

        <thead>

          <tr>

            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Acciones</th>

          </tr>

        </thead>

        <tbody>

          {

            residuos.map(residuo => (

              <tr key={residuo.id}>

                <td>{residuo.id}</td>
                <td>{residuo.nombre}</td>
                <td>{residuo.tipo}</td>
                <td>{residuo.cantidad}</td>
                <td>{residuo.unidadMedida}</td>

                <td>

                  <button
                    onClick={() => editarResiduo(residuo)}
                  >

                    Editar

                  </button>

                  <button
                    onClick={() => borrarResiduo(residuo.id)}
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

export default Residuos