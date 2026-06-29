/*
  Menu.jsx

  Este componente representa el menú principal
  de navegación del sistema Eco Vida.

  Recibe mediante Props la función setPagina,
  la cual permite cambiar la página visible
  dentro del componente App.
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

      {/* Botón del módulo clientes */}
      <button
        className="menu-boton"
        onClick={() => setPagina('clientes')}
      >
        👥 Clientes
      </button>

      {/* Botón del módulo residuos */}
      <button
        className="menu-boton"
        onClick={() => setPagina('residuos')}
      >
        ♻️ Residuos
      </button>

    </nav>

  )

}

/*
  Exporta el componente para ser utilizado
  desde App.jsx.
*/
export default Menu