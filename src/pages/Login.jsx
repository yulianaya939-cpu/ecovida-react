/*
  Login.jsx

  Página encargada del inicio de sesión
  del sistema Eco Vida.
*/

import { useState } from "react";
import { iniciarSesion } from "../services/LoginService";
import "../styles/Login.css";

function Login({ setAutenticado, setRol }) {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const ingresar = async () => {

    try {

      const respuesta = await iniciarSesion({
        correo,
        password
      });

      if (respuesta.autenticado) {

        /*
          Guarda el token JWT recibido
          desde el backend.
        */
        localStorage.setItem(
          "token",
          respuesta.token
        );

        /*
          Guarda el rol del usuario para
          controlar la interfaz de React.
        */
        localStorage.setItem(
          "rol",
          respuesta.rol
        );

        /*
          Actualiza el estado de autenticación
          y el rol en App.jsx.
        */
        setRol(respuesta.rol);
        setAutenticado(true);

        alert(respuesta.mensaje);

      } else {

        alert(respuesta.mensaje);

      }

    } catch (error) {

      console.error("Error en el inicio de sesión:", error);

      alert(
        "No fue posible conectar con el servidor."
      );

    }

  };

  return (

    <div className="login-container">

      <h2>Inicio de Sesión</h2>

      <input
        type="email"
        placeholder="Correo electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={ingresar}>
        Ingresar
      </button>

    </div>

  );

}

export default Login;