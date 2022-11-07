import React from "react";

const List = ({ usuarios }) => {
  return (
    <section>
      <h1>Mostrar Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.name}</td>
              <td>{usuario.lastname}</td>
              <td>{usuario.email}</td>
              <td>
                <button
                  type="button"
                  onClick={
                    () => console.log(`/usuarios/detalle/${usuario.id}`)
                    // navigate(`/pacientes/detalle/${usuario.id}`)
                  }
                >
                  Visualizar
                </button>
                <button
                  type="button"
                  onClick={
                    () => console.log(`/usuarios/editar/${usuario.id}`)
                    // navigate(`/pacientes/editar/${usuario.id}`)
                  }
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    console.log(`handleDelete(${usuario.id})`);
                    // handleDelete(usuario.id);
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={() => {
          console.log("Actualizar");
          // handleDelete(usuario.id);
        }}
      >
        Actualizar
      </button>
    </section>
  );
};

export default List;
