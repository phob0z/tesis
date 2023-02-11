import React from "react";
import { useLocation } from "react-router-dom";

import classes from "./Menu.module.css";
import SubOption from "./SubOption";

function SubMenu(props) {
  const location = useLocation();
  return (
    <div className={classes.subMenu}>
      <div className={classes.subOptions}>
        {props.subOptions.map((option) => (
          <SubOption
            selected={
              location.pathname.split("/")[1] === option.route.split("/")[1]
            }
            key={option.title}
            route={option.route}
            onMouseOver={props.onMouseOver}
            onMouseOut={props.onMouseOut}
            onClick={props.onClick}
          >
            {option.title}
          </SubOption>
        ))}
      </div>
    </div>
  );
}

export default SubMenu;
