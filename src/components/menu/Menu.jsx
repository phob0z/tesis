import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import Button from "../../components/atoms/Button";
import Option from "./Option";

import classes from "./Menu.module.css";
import Photo from "./Photo";
import SubMenu from "./SubMenu";
import { useMemo } from "react";

const Menu = () => {
  const { user, logout } = useContext(AuthContext);
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const [showSubMenu, setShowSubMenu] = useState(false);
  const [subMenu, setSubMenu] = useState();

  const menuSecretary = useMemo(
    () => [
      { title: "Perfil", route: "/profile" },
      { title: "Información", route: "/information" },
      {
        title: "Usuarios",
        subMenu: [
          { title: "Estudiantes", route: "/students" },
          { title: "Profesores", route: "/teachers" },
        ],
        route: "#",
      },
      {
        title: "Gestión",
        subMenu: [
          { title: "Materia1", route: "/materia1" },
          { title: "Materia2", route: "/materia2" },
        ],
        route: "#",
      },
      { title: "Calificaciones", route: "/grades" },
      { title: "Reportes", route: "/reports" },
    ],
    []
  );

  const menuTeacher = useMemo(
    () => [
      { title: "Perfil", route: "/profile" },
      { title: "Calificaciones", route: "/grades" },
      { title: "Reportes", route: "/reports" },
    ],
    []
  );

  const menuStudent = useMemo(
    () => [
      { title: "Perfil", route: "/profile" },
      { title: "Calificaciones", route: "/grades" },
      { title: "Reportes", route: "/reports" },
    ],
    []
  );

  const [menu, setMenu] = useState(menuSecretary);

  useEffect(() => {
    switch (user.role) {
      case "secretary":
        setMenu(menuSecretary);
        break;
      case "teacher":
        setMenu(menuTeacher);
        break;
      case "student":
        setMenu(menuStudent);
        break;
      default:
        setMenu(menuStudent);
        break;
    }
  }, [user, menuSecretary, menuTeacher, menuStudent]);

  var subMenuTimer;
  const fadeSubmenu = 1000;

  const handleMenu = (e) => {
    if (e.type === "mouseout") {
      subMenuTimer = setTimeout(() => {
        setShowSubMenu(false);
      }, fadeSubmenu);
    }
    if (e.type === "mouseover") {
      clearTimeout(subMenuTimer);
      const option = menu.find(({ title }) => title === e.target.innerText);
      if (option.subMenu !== undefined) {
        setSubMenu(option.subMenu);
        setShowSubMenu(true);
      } else setShowSubMenu(false);
    }
  };

  const handleSubMenu = (e) => {
    if (e.type === "mouseout") {
      subMenuTimer = setTimeout(() => {
        setShowSubMenu(false);
      }, fadeSubmenu);
    }
    if (e.type === "mouseover") {
      clearTimeout(subMenuTimer);
    }
    setShowSubMenu(true);
  };

  const onLogout = async () => {
    setIsLoading(true);
    try {
      // await axios.post(
      //   `${process.env.REACT_APP_BACK_URL}/logout/`,
      //   {},
      //   { headers: { accept: "application/json", authorization: token } }
      // );
      logout();
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
      setHasError(true);
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.menu}>
      <div className={classes.options}>
        {menu.map((option) => (
          <Option
            route={option.route}
            key={option.title}
            onMouseOver={(e) => {
              handleMenu(e);
            }}
            onMouseOut={(e) => {
              handleMenu(e);
            }}
          >
            {option.title}
          </Option>
        ))}
        {showSubMenu && (
          <SubMenu
            subOptions={subMenu}
            onMouseOver={(e) => {
              handleSubMenu(e);
            }}
            onMouseOut={(e) => {
              handleSubMenu(e);
            }}
          />
        )}
        <div className={classes.logoutBox}>
          <Button type="button" className="exitButton" onClick={onLogout}>
            Salir
          </Button>
        </div>
      </div>
      <Photo src={user.avatar} alt={`Imagen de ${user.name_1}`} />
    </div>
  );
};

export default Menu;
