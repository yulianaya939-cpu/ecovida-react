/*
  App.jsx

  Componente principal del sistema Eco Vida.

  Controla el inicio de sesión y la navegación
  entre los diferentes módulos.
*/

/* Importación de estilos */
import './App.css'

/* Hook de React */
import { useState } from 'react'

/* Componentes */
import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'

/* Páginas */
import Login from './pages/Login'
import Inicio from './pages/Inicio'
import Cliente from './pages/Cliente'
import Residuos from './pages/Residuos'
import Usuario from './pages/Usuario'

function App() {

  // Controla si el usuario inició sesión
  const [autenticado, setAutenticado] = useState(false)

  // Controla la página actual
  const [pagina, setPagina] = useState('inicio')

  // Si no ha iniciado sesión, mostrar Login
  if (!autenticado) {

    return (

      <div className="app">

        <Header />

        <Login
          setAutenticado={setAutenticado}
        />

        <Footer />

      </div>

    )

  }

  // Si inició sesión, mostrar la aplicación
  return (

    <div className="app">

      <Header />

      <Menu setPagina={setPagina} />

      {
        pagina === 'inicio' && <Inicio />
      }

      {
        pagina === 'clientes' && <Cliente />
      }

      {
        pagina === 'residuos' && <Residuos />
      }

      {
        pagina === 'usuarios' && <Usuario />
      }

      <Footer />

    </div>

  )

}

export default App