import React, { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

const Menu = () => {
  const navigate = useNavigate();

  const { setUser, user, logout } = useContext(AuthContext);
  const { setModal, setIsLoading, setHasError } = useContext(AlertContext);

  
  useEffect(() => {
    console.log(user.role);
  }, []);

  // const location = useLocation();
  // const urlActual = location.pathname;
  const token = localStorage.getItem("token");

  

  const onLogout = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        { headers: { accept: "application/json", authorization: token } }
      );
      navigate("/login", { replace: true });
      logout();
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      Holi {user.full_name}
      <br />
      <button type="button" onClick={onLogout}>
        Logout
      </button>
      <button
        type="button"
        onClick={() => {
          setModal({ title: "Prueba", message: user.full_name });
          setHasError(true);
        }}
      >
        Modal
      </button>
      <button
        type="button"
        onClick={() => {
          setIsLoading(true);
        }}
      >
        Spinner
      </button>
      <button
        type="button"
        onClick={() => {
          setUser("ASDASD");
        }}
      >
        Cambiar Nombre
      </button>
    </Fragment>
  );
};

export default Menu;
