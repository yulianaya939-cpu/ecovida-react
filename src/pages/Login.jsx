/*
  Login.jsx

  Página encargada del inicio de sesión
  del sistema Eco Vida.
*/

import { useState } from "react";
import { iniciarSesion } from "../services/LoginService";
import "../styles/Login.css";

function Login({ setAutenticado }) {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const ingresar = async () => {

    try {

      const respuesta = await iniciarSesion({

        correo,
        password

      });

      if (respuesta.autenticado) {

        localStorage.setItem(
          "token",
          respuesta.token
        );

        alert(respuesta.mensaje);

        setAutenticado(true);

      } else {

        alert(respuesta.mensaje);

      }

    } catch (error) {

      alert("No fue posible conectar con el servidor.");

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