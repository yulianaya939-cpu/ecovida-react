import React from "react";

function Menu({ setPagina, rol }) {

  const esAdministrador = rol === "Administrador";

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

    </nav>
  );
}

export default Menu;