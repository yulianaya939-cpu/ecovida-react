/*
  App.jsx

  Componente principal de la aplicación Eco Vida.

  Desde este archivo se administra la navegación
  entre las diferentes páginas utilizando useState.
*/

/* Importación de estilos */
import './App.css'

/* Importación de Hook de React */
import { useState } from 'react'

/* Importación de componentes */
import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'

/* Importación de páginas */
import Inicio from './pages/Inicio'
import Cliente from './pages/Cliente'
import Residuos from './pages/Residuos'

function App() {

  /*
    Estado encargado de controlar
    la página actualmente visible.
  */
  const [pagina, setPagina] = useState('inicio')

  return (

    <div className="app">

      {/* Encabezado principal */}
      <Header />

      {/* Menú de navegación */}
      <Menu setPagina={setPagina} />

      {/* Página de inicio */}
      {
        pagina === 'inicio' && <Inicio />
      }

      {/* Página de clientes */}
      {
        pagina === 'clientes' && <Cliente />
      }

      {/* Página de residuos */}
      {
        pagina === 'residuos' && <Residuos />
      }

      {/* Pie de página */}
      <Footer />

    </div>

  )
}

/*
  Exporta el componente App para que pueda
  ser utilizado por main.jsx.
*/
export default App