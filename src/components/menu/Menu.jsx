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
  const { user, logout, setProfile } = useContext(AuthContext);
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
          { title: "Usuarios1", route: "/usuarios1" },
          { title: "Usuarios2", route: "/usuarios2" },
          { title: "Usuarios3", route: "/usuarios3" },
          { title: "Usuarios4", route: "/usuarios4" },
        ],
        route: "#",
      },
      {
        title: "Materias",
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
      { title: "Información", route: "/information" },
      { title: "Calificaciones", route: "/grades" },
      { title: "Reportes", route: "/reports" },
    ],
    []
  );

  const menuStudent = useMemo(
    () => [
      { title: "Perfil", route: "/profile" },
      { title: "Información", route: "/information" },
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

  const onProfileHandler = async () => {
    if (!user.identification) {
      setIsLoading(true);
      try {
        let newUser = {
          name: "Leonel",
          last_name: "Molina",
          identification: "1758963050",
          birthdate: "18-06-1988",
          email: "leonel@gmail.com",
          home_phone: "123456789",
          personal_phone: "1234567890",
          address: "Quito",
          role: user.role,
          avatar: user.avatar,
        };
        // const token = localStorage.getItem("token");
        //   const response = await axios.post(
        //     `${process.env.REACT_APP_BACK_URL}/profile/`,
        //     // "http://localhost:8000/api/profile",
        //     { token },
        //     { headers: { accept: "application/json" } }
        //   );
        //   const { access_token, token_type, user } = response.data.data;
        setProfile(newUser);
      } catch (error) {
        setIsLoading(false);
        setModal({ title: "ERROR", message: error.response.data.message });
        setHasError(true);
      }

      setIsLoading(false);
    } else {
      setProfile(JSON.parse(localStorage.getItem("user")));
    }
  };

  return (
    <div className={classes.menu}>
      <div className={classes.options}>
        {menu.map((option) => (
          // console.log(option.title) &&
          // console.log(Object.keys(option)[0])
          <Option
            route={option.route}
            key={option.title}
            onMouseOver={(e) => {
              handleMenu(e);
            }}
            onMouseOut={(e) => {
              handleMenu(e);
            }}
            onClick={onProfileHandler}
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
