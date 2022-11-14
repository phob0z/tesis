import React, { useContext, useEffect } from "react";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";
import { useNavigate } from "react-router-dom";

import Button from "../../components/atoms/Button";
import Option from "./Option";

import classes from "./Menu.module.css";
import Photo from "./Photo";

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
    <div className={classes.menu}>
      <div className={classes.options}>
        <Option>Perfil</Option>
        <Option>Información</Option>
        <Option>Usuarios</Option>
        <Option>Materias</Option>
        <Option>Calificaciones</Option>
        <Option>Reportes</Option>
        <div className={classes.logoutBox}>
          <Button type="button" className="exitButton" onClick={onLogout}>
            Salir
          </Button>
        </div>
      </div>
      <Photo src={user.image} alt={`Imagen de ${user.full_name}`}/>
    </div>
  );
};

export default Menu;
