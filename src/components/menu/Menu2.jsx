import React, { useContext, useState } from "react";

import AuthContext from "../../contexts/auth/AuthContext";

import Option from "./Option";

import classes from "./Menu.module.css";
import Button from "../atoms/Button";

const Menu2 = () => {
  const { logout } = useContext(AuthContext);
  // eslint-disable-next-line
  const [menu, setMenu] = useState({ title: "Perfil", route: "/profile" });

  const onLogout = async () => {
    logout();
  };

  return (
    <div className={classes.menu}>
      <div className={classes.options}>
        <Option route={menu.route} key={menu.title} onClick={() => {}}>
          {menu.title}
        </Option>
        <div className={classes.logoutBox}>
          <Button type="button" className="exitButton" onClick={onLogout}>
            Salir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Menu2;
