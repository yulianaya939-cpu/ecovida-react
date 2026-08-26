/*
  App.jsx

  Componente principal del sistema Eco Vida.

  Controla el inicio de sesión y la navegación
  entre los diferentes módulos de la aplicación.
*/

import './App.css'

/* Hook de React para manejar estados */
import { useState } from 'react'

/* Componentes principales */
import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'

/* Páginas o módulos de la aplicación */
import Login from './pages/Login'
import Inicio from './pages/Inicio'
import Cliente from './pages/Cliente'
import Residuos from './pages/Residuos'
import Usuario from './pages/Usuario'
import Recolecciones from './pages/Recolecciones'

function App() {

  /*
    Estado que controla si el usuario
    ha iniciado sesión correctamente.
  */
  const [autenticado, setAutenticado] = useState(false)

  /*
    Estado que controla cuál módulo
    se está mostrando actualmente.
  */
  const [pagina, setPagina] = useState('inicio')

  /*
    Si el usuario todavía no ha iniciado sesión,
    se muestra únicamente la pantalla de Login.
  */
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

  /*
    Cuando el usuario inicia sesión,
    se muestra el menú y los diferentes módulos.
  */
  return (

    <div className="app">

      <Header />

      <Menu
        setPagina={setPagina}
      />

      {/* Página de inicio */}
      {
        pagina === 'inicio' && <Inicio />
      }

      {/* Módulo de clientes */}
      {
        pagina === 'clientes' && <Cliente />
      }

      {/* Módulo de residuos */}
      {
        pagina === 'residuos' && <Residuos />
      }

      {/* Módulo de usuarios */}
      {
        pagina === 'usuarios' && <Usuario />
      }

      {/* Módulo de recolecciones */}
      {
        pagina === 'recolecciones' && <Recolecciones />
      }

      <Footer />

    </div>

  )
}

export default App