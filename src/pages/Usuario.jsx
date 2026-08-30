/*
  Usuario.jsx

  Componente encargado de gestionar
  el módulo de Usuarios de Eco Vida.

  El Administrador puede:
  - Crear usuarios.
  - Editar usuarios.
  - Cambiar roles.
  - Activar o desactivar usuarios.
  - Eliminar usuarios.

  El Usuario no tiene acceso al módulo de usuarios.

  La autorización real también es controlada
  por el backend mediante Spring Security y JWT.
*/

import React, { useEffect, useState } from "react";

import {
  obtenerUsuarios,
  guardarUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../services/UsuarioService";

import "../styles/Usuario.css";


function Usuario() {

  /*
    Lista de usuarios registrados.
  */
  const [usuarios, setUsuarios] = useState([]);

  /*
    Usuario seleccionado para edición.
  */
  const [usuarioSeleccionado, setUsuarioSeleccionado] =
    useState(null);

  /*
    Datos del formulario.
  */
  const [formulario, setFormulario] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    password: "",
    rol: "Usuario",
    activo: true
  });


  /*
    Recuperamos el rol del usuario
    autenticado.
  */
  const rol = localStorage.getItem("rol");


  /*
    Determinamos si tiene permisos
    administrativos.
  */
  const esAdministrador = rol === "Administrador";


  /*
    Carga los usuarios registrados.
  */
  const cargarUsuarios = async () => {

    try {

      const datos = await obtenerUsuarios();

      setUsuarios(datos);

    } catch (error) {

      console.error(
        "Error al cargar usuarios:",
        error
      );

      if (error.response?.status === 401) {

        alert(
          "La sesión no es válida o ha expirado."
        );

      } else if (error.response?.status === 403) {

        alert(
          "No tienes permisos para consultar los usuarios."
        );

      }

    }

  };


  /*
    Cargar usuarios al abrir el módulo.
  */
  useEffect(() => {

    cargarUsuarios();

  }, []);


  /*
    Manejar cambios del formulario.
  */
  const manejarCambio = (e) => {

    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setFormulario({
      ...formulario,
      [name]:
        type === "checkbox"
          ? checked
          : value
    });

  };


  /*
    Preparar un usuario para editarlo.
  */
  const editarUsuario = (usuario) => {

    if (!esAdministrador) {

      return;

    }

    setUsuarioSeleccionado(usuario);

    setFormulario({
      nombres: usuario.nombres || "",
      apellidos: usuario.apellidos || "",
      correo: usuario.correo || "",

      /*
        La contraseña nunca se carga
        desde el usuario existente.
      */
      password: "",

      rol: usuario.rol || "Usuario",
      activo: usuario.activo ?? true
    });

  };


  /*
    Cancelar edición y limpiar
    completamente el formulario.
  */
  const cancelarEdicion = () => {

    setUsuarioSeleccionado(null);

    setFormulario({
      nombres: "",
      apellidos: "",
      correo: "",
      password: "",
      rol: "Usuario",
      activo: true
    });

  };


  /*
    Crear un usuario nuevo o actualizar
    uno existente.
  */
  const manejarGuardarUsuario = async (e) => {

    e.preventDefault();

    if (!esAdministrador) {

      return;

    }

    try {

      const datosUsuario = {

        nombres: formulario.nombres,
        apellidos: formulario.apellidos,
        correo: formulario.correo,
        password: formulario.password,
        rol: formulario.rol,
        activo: formulario.activo

      };


      /*
        Si existe un usuario seleccionado,
        se actualiza.
      */
      if (usuarioSeleccionado) {

        await actualizarUsuario(
          usuarioSeleccionado.id,
          datosUsuario
        );

        alert(
          "Usuario actualizado correctamente."
        );

      } else {

        /*
          Si no existe usuario seleccionado,
          se crea uno nuevo.
        */
        await guardarUsuario(datosUsuario);

        alert(
          "Usuario creado correctamente."
        );

      }


      /*
        Limpiar formulario.
      */
      cancelarEdicion();


      /*
        Actualizar listado.
      */
      await cargarUsuarios();

    } catch (error) {

      console.error(
        "Error al guardar usuario:",
        error
      );

      if (error.response?.status === 403) {

        alert(
          "No tienes permisos para realizar esta operación."
        );

      } else if (error.response?.status === 401) {

        alert(
          "La sesión no es válida o ha expirado."
        );

      } else {

        alert(
          "No fue posible guardar el usuario."
        );

      }

    }

  };


  /*
    Eliminar un usuario.
  */
  const manejarEliminarUsuario = async (id) => {

    if (!esAdministrador) {

      return;

    }

    const confirmar = window.confirm(
      "¿Está seguro de eliminar este usuario?"
    );

    if (!confirmar) {

      return;

    }

    try {

      await eliminarUsuario(id);

      alert(
        "Usuario eliminado correctamente."
      );

      await cargarUsuarios();

    } catch (error) {

      console.error(
        "Error al eliminar usuario:",
        error
      );

      if (error.response?.status === 403) {

        alert(
          "No tienes permisos para eliminar usuarios."
        );

      } else if (error.response?.status === 401) {

        alert(
          "La sesión no es válida o ha expirado."
        );

      } else {

        alert(
          "No fue posible eliminar el usuario."
        );

      }

    }

  };


  return (

    <section className="usuario-container">

      <h2>Gestión de Usuarios</h2>


      {/* =====================================
          FORMULARIO ADMINISTRATIVO
          ===================================== */}

      {esAdministrador && (

        <form
          className="usuario-formulario"
          onSubmit={manejarGuardarUsuario}
          autoComplete="off"
        >

          <h3>

            {usuarioSeleccionado
              ? "Editar usuario"
              : "Registrar usuario"}

          </h3>


          <input
            type="text"
            name="nombres"
            placeholder="Nombres"
            value={formulario.nombres}
            onChange={manejarCambio}
            autoComplete="off"
            required
          />


          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            value={formulario.apellidos}
            onChange={manejarCambio}
            autoComplete="off"
            required
          />


          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formulario.correo}
            onChange={manejarCambio}
            autoComplete="off"
            required
          />


          <input
            type="password"
            name="password"
            placeholder={
              usuarioSeleccionado
                ? "Nueva contraseña (opcional)"
                : "Contraseña"
            }
            value={formulario.password}
            onChange={manejarCambio}
            autoComplete="new-password"
            required={!usuarioSeleccionado}
          />


          <div className="campo-usuario">

            <label htmlFor="rol">
              Rol
            </label>

            <select
              id="rol"
              name="rol"
              value={formulario.rol}
              onChange={manejarCambio}
            >

              <option value="Usuario">
                Usuario
              </option>

              <option value="Administrador">
                Administrador
              </option>

            </select>

          </div>


          <div className="usuario-activo">

            <input
              type="checkbox"
              id="activo"
              name="activo"
              checked={formulario.activo}
              onChange={manejarCambio}
            />

            <label htmlFor="activo">
              Usuario activo
            </label>

          </div>


          <div className="usuario-botones">

            <button type="submit">

              {usuarioSeleccionado
                ? "Actualizar usuario"
                : "Crear usuario"}

            </button>


            {usuarioSeleccionado && (

              <button
                type="button"
                onClick={cancelarEdicion}
              >
                Cancelar
              </button>

            )}

          </div>

        </form>

      )}


      {/* =====================================
          LISTADO DE USUARIOS
          ===================================== */}

      <div className="usuario-listado">

        <h3>
          Usuarios registrados
        </h3>


        <table>

          <thead>

            <tr>

              <th>ID</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>

              {esAdministrador && (
                <th>Acciones</th>
              )}

            </tr>

          </thead>


          <tbody>

            {usuarios.map((usuario) => (

              <tr key={usuario.id}>

                <td>
                  {usuario.id}
                </td>

                <td>
                  {usuario.nombres}
                </td>

                <td>
                  {usuario.apellidos}
                </td>

                <td>
                  {usuario.correo}
                </td>

                <td>
                  {usuario.rol}
                </td>

                <td>
                  {usuario.activo
                    ? "Activo"
                    : "Inactivo"}
                </td>


                {esAdministrador && (

                  <td className="acciones-usuario">

                    <button
                      onClick={() =>
                        editarUsuario(usuario)
                      }
                    >
                      Editar
                    </button>


                    <button
                      onClick={() =>
                        manejarEliminarUsuario(usuario.id)
                      }
                    >
                      Eliminar
                    </button>

                  </td>

                )}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>

  );

}


export default Usuario;