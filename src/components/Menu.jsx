import React from "react";

function Menu({ setPagina, rol, setAutenticado, setRol }) {

  const esAdministrador = rol === "Administrador";

  const cerrarSesion = () => {

    // Elimina el token y el rol almacenados
    localStorage.removeItem("token");
    localStorage.removeItem("rol");

    // Actualiza el estado de la aplicación
    setRol(null);
    setAutenticado(false);
  };

  return (
    <nav className="menu">

      <button onClick={() => setPagina("inicio")}>
        Inicio
      </button>

      <button onClick={() => setPagina("clientes")}>
        Clientes
      </button>

      <button onClick={() => setPagina("residuos")}>
        Residuos
      </button>

      <button onClick={() => setPagina("recolecciones")}>
        Recolecciones
      </button>

      {esAdministrador && (
        <button onClick={() => setPagina("usuarios")}>
          Usuarios
        </button>
      )}

      <button onClick={cerrarSesion}>
        Cerrar sesión
      </button>

    </nav>
  );
}

export default Menu;