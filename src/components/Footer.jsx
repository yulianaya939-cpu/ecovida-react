/*
  Footer.jsx

  Este componente representa el pie de página
  del sistema Eco Vida.

  Su función es mostrar información general
  de la aplicación.
*/

/* Importación de estilos */
import '../styles/Footer.css'

function Footer() {

  return (

    <footer className="footer">

      {/* Información del sistema */}
      <p>
        © 2026 Eco Vida S.A.S. | Sistema de Gestión de Residuos Reciclables
      </p>

      {/* Información académica */}
      <p>
        Desarrollado con React y Spring Boot
      </p>

    </footer>

  )

}

/*
  Exporta el componente Footer para ser utilizado
  en App.jsx.
*/
export default Footer