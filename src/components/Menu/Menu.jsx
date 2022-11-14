import React, { Fragment, useContext, useEffect } from "react";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";
import { useNavigate } from "react-router-dom";

import Button from "../../components/atoms/Button";

import classes from "./Menu.module.css";

const Menu = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { setIsLoading, setHasError } = useContext(AlertContext);

  useEffect(() => {
    console.log(user.role);
  }, [user]);

  const token = localStorage.getItem("token");

  const onLogout = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        { headers: { accept: "application/json", authorization: token } }
      );
      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <div className={classes.menu}>
        <div className={classes.optionBox}>
          <div className={classes.option}>Perfil</div>
        </div>
        <div className={classes.optionBox}>
          <div className={classes.option}>Información</div>
        </div>
        <div className={classes.optionBox}>
          <div className={classes.option}>Usuarios</div>
        </div>
        <div className={classes.optionBox}>
          <div className={classes.option}>Materias</div>
        </div>
        <div className={classes.optionBox}>
          <div className={classes.option}>Calificaciones</div>
        </div>
        <div className={classes.optionBox}>
          <div className={classes.option}>Reportes</div>
        </div>
        <div className={classes.logoutBox}>
          <Button type="button" className="exitButton" onClick={onLogout}>
            Salir
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Menu;
