function UsuarioTable({

  usuarios,
  editar,
  eliminar

}) {

  return (

    <table border="1">

      <thead>

        <tr>

          <th>ID</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Correo</th>
          <th>Rol</th>
          <th>Acciones</th>

        </tr>

      </thead>

      <tbody>

        {

          usuarios.map((usuario)=>(

            <tr key={usuario.id}>

              <td>{usuario.id}</td>
              <td>{usuario.nombres}</td>
              <td>{usuario.apellidos}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.rol}</td>

              <td>

                <button
                  onClick={()=>editar(usuario)}
                >
                  Editar
                </button>

                <button
                  onClick={()=>eliminar(usuario.id)}
                >
                  Eliminar
                </button>

              </td>

            </tr>

          ))

        }

      </tbody>

    </table>

  );

}

export default UsuarioTable;