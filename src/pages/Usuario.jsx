/*
  Usuario.jsx

  Este componente representa el módulo
  de gestión de usuarios del sistema Eco Vida.

  Permite registrar, consultar,
  actualizar y eliminar usuarios.
*/

import { useEffect, useState } from "react";

/*
  Servicios del módulo Usuario.
*/
import {
  obtenerUsuarios,
  guardarUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../services/UsuarioService";

/*
  Componente encargado de mostrar
  la tabla de usuarios.
*/
import UsuarioTable from "../components/UsuarioTable";

function Usuario() {

  /*
    Lista de usuarios registrados.
  */
  const [usuarios, setUsuarios] = useState([]);

  /*
    Identificador del usuario
    que se encuentra en edición.
  */
  const [id, setId] = useState(null);

  /*
    Campos del formulario.
  */
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");

  /*
    Carga inicial del componente.
  */
  useEffect(() => {

    cargarUsuarios();

  }, []);

  /*
    Consulta todos los usuarios.
  */
  const cargarUsuarios = async () => {

    const datos = await obtenerUsuarios();

    setUsuarios(datos);

  };

  /*
    Limpia el formulario.
  */
  const limpiarFormulario = () => {

    setId(null);

    setNombres("");
    setApellidos("");
    setCorreo("");
    setPassword("");
    setRol("");

  };

  /*
    Guarda o actualiza un usuario.
  */
  const guardar = async () => {

    const usuario = {

      nombres,
      apellidos,
      correo,
      password,
      rol,

    };

    if (id === null) {

      await guardarUsuario(usuario);

      alert("Usuario registrado correctamente.");

    } else {

      await actualizarUsuario(id, usuario);

      alert("Usuario actualizado correctamente.");

    }

    cargarUsuarios();

    limpiarFormulario();

  };

  /*
    Carga un usuario en el formulario
    para editarlo.
  */
  const editar = (usuario) => {

    setId(usuario.id);

    setNombres(usuario.nombres);
    setApellidos(usuario.apellidos);
    setCorreo(usuario.correo);
    setPassword(usuario.password);
    setRol(usuario.rol);

  };

  /*
    Elimina un usuario.
  */
  const eliminar = async (id) => {

    const confirmar = window.confirm(
      "¿Desea eliminar este usuario?"
    );

    if (!confirmar) {

      return;

    }

    await eliminarUsuario(id);

    cargarUsuarios();

  };

  return (

    <div>

      <h2>Usuarios</h2>

      <input
        placeholder="Nombres"
        value={nombres}
        onChange={(e) => setNombres(e.target.value)}
      />

      <input
        placeholder="Apellidos"
        value={apellidos}
        onChange={(e) => setApellidos(e.target.value)}
      />

      <input
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />

      <input
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        placeholder="Rol"
        value={rol}
        onChange={(e) => setRol(e.target.value)}
      />

      <br /><br />

      <button onClick={guardar}>

        Guardar Usuario

      </button>

      <hr />

      <UsuarioTable
        usuarios={usuarios}
        editar={editar}
        eliminar={eliminar}
      />

    </div>

  );

}

export default Usuario;