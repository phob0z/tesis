import React, { useContext, useState } from "react";
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
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const [subMenu, setSubMenu] = useState(false);
  console.log(subMenu);

  const token = localStorage.getItem("token");

  const onLogout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/logout/`,
        // "http://127.0.0.1:8000/api/logout",
        { token },
        { headers: { accept: "application/json", authorization: token } }
      );
      logout();
      console.log(`"Response: " ${response}`);
      
      // navigate("/login", { replace: true });
    } catch (error) {
      console.log(`"error: " ${error}`);
      console.log(`"error.response: " ${error.response}`);
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
      setHasError(true);
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.menu}>
      <div className={classes.options}>
        <Option>Perfil</Option>
        <Option>Información</Option>
        <Option onMouseOver={() => {setSubMenu(true)}} onMouseOut={() => {setSubMenu(false)}}>Usuarios</Option>
        <Option>Materias</Option>
        <Option>Calificaciones</Option>
        <Option>Reportes</Option>
        <div className={classes.logoutBox}>
          <Button type="button" className="exitButton" onClick={onLogout}>
            Salir
          </Button>
        </div>
        {/* {subMenu && <Submenu/>} */}
      </div>
      <Photo src={user.image} alt={`Imagen de ${user.full_name}`}/>
    </div>
  );
};

export default Menu;