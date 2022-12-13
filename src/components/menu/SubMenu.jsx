import React from "react";

import classes from "./Menu.module.css";
import SubOption from "./SubOption";

function SubMenu(props) {
  return (
    <div className={classes.subMenu}>
      <div className={classes.subOptions}>
        {props.subOptions.map((option) => (
          <SubOption key={option.title} route={option.route} onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut} onClick={props.onClick}>{option.title}</SubOption>
        ))}
      </div>
    </div>
  );
}

export default SubMenu;
