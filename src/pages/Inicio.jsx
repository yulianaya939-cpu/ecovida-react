/*
  Inicio.jsx

  Dashboard principal del sistema Eco Vida.

  Presenta información real obtenida desde
  los módulos del sistema y adapta su contenido
  según el rol del usuario autenticado.
*/

import { useEffect, useState } from "react";

import { obtenerUsuarios } from "../services/UsuarioService";
import { obtenerClientes } from "../services/ClienteService";
import { obtenerResiduos } from "../services/ResiduoService";
import { obtenerRecolecciones } from "../services/RecoleccionService";

import "../styles/Inicio.css";


function Inicio() {

  /*
    Recuperamos el rol del usuario autenticado.
  */
  const rol = localStorage.getItem("rol");


  /*
    Determinamos si el usuario es Administrador.
  */
  const esAdministrador =
    rol === "Administrador";


  /*
    Estados utilizados para los indicadores.
  */
  const [totalUsuarios, setTotalUsuarios] =
    useState(0);

  const [totalClientes, setTotalClientes] =
    useState(0);

  const [totalResiduos, setTotalResiduos] =
    useState(0);

  const [totalRecolecciones, setTotalRecolecciones] =
    useState(0);


  /*
    Estado de carga.
  */
  const [cargando, setCargando] =
    useState(true);


  /*
    Estado para controlar errores
    durante la consulta de información.
  */
  const [error, setError] =
    useState(false);


  /*
    Consulta la información necesaria
    para construir los indicadores.
  */
  useEffect(() => {

    const cargarIndicadores = async () => {

      try {

        setCargando(true);
        setError(false);


        /*
          Consultamos clientes, residuos
          y recolecciones.
        */
        const [
          clientes,
          residuos,
          recolecciones
        ] = await Promise.all([

          obtenerClientes(),
          obtenerResiduos(),
          obtenerRecolecciones()

        ]);


        /*
          Los valores mostrados en el dashboard
          provienen de la cantidad real de registros
          obtenidos desde el backend.
        */
        setTotalClientes(
          clientes.length
        );

        setTotalResiduos(
          residuos.length
        );

        setTotalRecolecciones(
          recolecciones.length
        );


        /*
          La consulta de usuarios solamente
          se realiza para el Administrador,
          debido a los permisos definidos
          en el backend.
        */
        if (esAdministrador) {

          const usuarios =
            await obtenerUsuarios();

          setTotalUsuarios(
            usuarios.length
          );

        }


      } catch (error) {

        console.error(
          "Error al cargar el dashboard:",
          error
        );

        setError(true);

      } finally {

        setCargando(false);

      }

    };


    cargarIndicadores();

  }, [esAdministrador]);


  return (

    <section className="dashboard-container">


      {/* =====================================
          ENCABEZADO DEL DASHBOARD
          ===================================== */}

      <div className="dashboard-encabezado">

        <h2>
          Bienvenido a Eco Vida
        </h2>

        <p>
          Usuario autenticado:
          <strong>
            {" "}{rol}
          </strong>
        </p>

        <p>
          Resumen general del sistema
        </p>

      </div>


      {/* =====================================
          CARGANDO
          ===================================== */}

      {cargando && (

        <p className="dashboard-mensaje">
          Cargando información...
        </p>

      )}


      {/* =====================================
          ERROR
          ===================================== */}

      {error && !cargando && (

        <p className="dashboard-error">
          No fue posible cargar la información
          del dashboard.
        </p>

      )}


      {/* =====================================
          INDICADORES
          ===================================== */}

      {!cargando && !error && (

        <div className="dashboard-indicadores">


          {/* Usuarios */}
          {esAdministrador && (

            <div className="dashboard-card">

              <h3>
                Usuarios
              </h3>

              <span>
                {totalUsuarios}
              </span>

              <p>
                Usuarios registrados
              </p>

            </div>

          )}


          {/* Clientes */}
          <div className="dashboard-card">

            <h3>
              Clientes
            </h3>

            <span>
              {totalClientes}
            </span>

            <p>
              Clientes registrados
            </p>

          </div>


          {/* Residuos */}
          <div className="dashboard-card">

            <h3>
              Residuos
            </h3>

            <span>
              {totalResiduos}
            </span>

            <p>
              Residuos registrados
            </p>

          </div>


          {/* Recolecciones */}
          <div className="dashboard-card">

            <h3>
              Recolecciones
            </h3>

            <span>
              {totalRecolecciones}
            </span>

            <p>
              Recolecciones registradas
            </p>

          </div>


        </div>

      )}


      {/* =====================================
          INFORMACIÓN SEGÚN EL ROL
          ===================================== */}

      {!cargando && !error && (

        <div className="dashboard-info">

          {esAdministrador ? (

            <p>
              Como Administrador puedes gestionar
              los usuarios y consultar la información
              general de los módulos del sistema.
            </p>

          ) : (

            <p>
              Como Usuario puedes consultar y
              gestionar las funciones disponibles
              para tu rol dentro del sistema.
            </p>

          )}

        </div>

      )}

    </section>

  );

}


export default Inicio;