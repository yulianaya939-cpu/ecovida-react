/*
  Menu.jsx

  Este componente representa el menú principal
  de navegación del sistema Eco Vida.

  Permite acceder a los diferentes módulos
  de la aplicación mediante botones.
*/

/* Importación de estilos */
import '../styles/Menu.css'

function Menu({ setPagina }) {

  return (

    <nav className="menu">

      {/* Botón de inicio */}
      <button
        className="menu-boton"
        onClick={() => setPagina('inicio')}
      >
        🏠 Inicio
      </button>

      {/* Botón del módulo de clientes */}
      <button
        className="menu-boton"
        onClick={() => setPagina('clientes')}
      >
        👥 Clientes
      </button>

      {/* Botón del módulo de residuos */}
      <button
        className="menu-boton"
        onClick={() => setPagina('residuos')}
      >
        ♻️ Residuos
      </button>

      {/* Botón del módulo de recolecciones */}
      <button
        className="menu-boton"
        onClick={() => setPagina('recolecciones')}
      >
        🚛 Recolecciones
      </button>

      {/* Botón del módulo de usuarios */}
      <button
        className="menu-boton"
        onClick={() => setPagina('usuarios')}
      >
        👤 Usuarios
      </button>

    </nav>

  )

}

/*
  Exporta el componente para utilizarlo
  desde App.jsx.
*/
export default Menu