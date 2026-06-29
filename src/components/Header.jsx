/*
  Header.jsx

  Componente encargado de mostrar el encabezado
  principal del sistema Eco Vida.

  Presenta el nombre del sistema y una breve
  descripción de la aplicación.
*/

import '../styles/Header.css'

function Header() {

  return (

    <header className="header">

      {/* Contenedor principal del encabezado */}
      <div className="header-contenido">

        {/* Nombre del sistema */}
        <h1 className="header-titulo">

          🌿 Eco Vida S.A.S

        </h1>

        {/* Descripción del sistema */}
        <p className="header-subtitulo">

          Sistema de Gestión de Residuos Reciclables

        </p>

      </div>

    </header>

  )

}

/*
  Exporta el componente para que pueda ser
  utilizado desde App.jsx.
*/
export default Header