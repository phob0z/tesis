import React from 'react'

import classes from "./Menu.module.css"
import Option from './Option';

function SubMenu() {
  return (
    <div className={classes.subMenu}>
      <div className={classes.options}>
        <Option>Perfil</Option>
        <Option>Información</Option>
        <Option>Materias</Option>
        <Option>Calificaciones</Option>
      </div>
    </div>
  );
}

export default SubMenu;