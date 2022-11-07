import React, { Fragment, useEffect, useState } from "react";
// import { Link, Routes, Route } from "react-router-dom";
// import "./App.css";
// import List from "./components/List";
// import { Login } from "./pages/Login";

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const consultarUsuarios = async () => {
      try {
        const peticion = await fetch(
          "https://63509cf03e9fa1244e498f8b.mockapi.io/api/v1/users"
        );
        const respuesta = await peticion.json();
        setUsuarios(respuesta);
      } catch (error) {
        console.log(error);
      }
    };
    consultarUsuarios();
  }, []);

  return (
    <Fragment>
      {/* <Link to="#">Learn React</Link>
      <Routes>
        <Route
          path="/"
          element={
            <section>
              <h1>Leonel</h1>
            </section>
          }
        ></Route>
      </Routes> */}
      {/* <List usuarios={usuarios}/> */}
      {/* <Login/> */}
    </Fragment>
  );
}

export default App;
