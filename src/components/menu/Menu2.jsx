import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import Option from "./Option";

import classes from "./Menu.module.css";

const Menu2 = () => {
  const { user, logout, setProfile } = useContext(AuthContext);
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const menu = useState({ title: "Perfil", route: "/profile" });

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
          <Option
            route={option.route}
            key={option.title}
            onClick={onProfileHandler}
          >
            {option.title}
          </Option>
        ))}
      </div>
    </div>
  );
};

export default Menu2;
