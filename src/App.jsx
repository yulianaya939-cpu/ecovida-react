/*
  App.jsx

  Componente principal del sistema Eco Vida.

  Controla el inicio de sesión y la navegación
  entre los diferentes módulos de la aplicación.
*/

import './App.css'

import { useState } from 'react'

import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'

import Login from './pages/Login'
import Inicio from './pages/Inicio'
import Cliente from './pages/Cliente'
import Residuos from './pages/Residuos'
import Usuario from './pages/Usuario'
import Recolecciones from './pages/Recolecciones'


function App() {

  /*
    Estado que indica si el usuario
    ha iniciado sesión.
  */
  const [autenticado, setAutenticado] = useState(false)

  /*
    Estado que almacena el rol del
    usuario que inició sesión.
  */
  const [rol, setRol] = useState(null)

  /*
    Estado que controla la página
    que se está mostrando.
  */
  const [pagina, setPagina] = useState('inicio')


  /*
    Si el usuario no está autenticado,
    se muestra únicamente la pantalla
    de inicio de sesión.
  */
  if (!autenticado) {

    return (

      <div className="app">

        <Header />

        <Login
          setAutenticado={setAutenticado}
          setRol={setRol}
        />

        <Footer />

      </div>

    )

  }


  /*
    Cuando el usuario está autenticado,
    se muestra el menú principal y
    los diferentes módulos.
  */
  return (

    <div className="app">

      <Header />

      <Menu
        setPagina={setPagina}
        rol={rol}
      />


      {/* Página de inicio */}
      {
        pagina === 'inicio' && <Inicio />
      }


      {/* Módulo de clientes */}
      {
        pagina === 'clientes' && (
          <Cliente rol={rol} />
        )
      }


      {/* Módulo de residuos */}
      {
        pagina === 'residuos' && (
          <Residuos rol={rol} />
        )
      }


      {/* Módulo de usuarios */}
      {
        pagina === 'usuarios' && (
          <Usuario rol={rol} />
        )
      }


      {/* Módulo de recolecciones */}
      {
        pagina === 'recolecciones' && (
          <Recolecciones rol={rol} />
        )
      }


      <Footer />

    </div>

  )

}


export default App