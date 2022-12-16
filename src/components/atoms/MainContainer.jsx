import React from "react";
import Card from "./Card";
import classes from "./MainContainer.module.css";

function MainContainer(props) {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.containerOptions} options={props.options} />
      <div className={classes.subContainer}>
        {/* <div className={classes.subSet}> */}
          INFO PERSONAL
          <Card theme="simple" label="Nombres" maxLength="35" />
          <Card theme="simple" label="Apellidos" maxLength="35" />
          <Card theme="simple" label="Cédula" maxLength="20" />
          {/* <Card theme="simple" label="Fecha de nacimiento" /> */}
        {/* </div> */}
        {/* <div className={classes.subSet}> */}
          INFO DE CONTACTO
          <Card theme="simple" label="Correo" maxLength="20" />
          {/* <Card theme="simple" label="Teléfono convencional" maxLength="9" />
          <Card theme="simple" label="Teléfono celular" maxLength="10" />
          <Card theme="simple" label="Dirección" maxLength="50" /> */}
          <Card theme="simple" label="Dirección" maxLength="50" />
          <Card theme="simple" label="Dirección" maxLength="50" />
          <Card theme="simple" label="Dirección" maxLength="50" />
          <Card theme="simple" label="Dirección" maxLength="50" />
          <Card theme="simple" label="Dirección" maxLength="50" />
          <Card theme="simple" label="Dirección" maxLength="50" />
          <Card theme="simple" label="Dirección" maxLength="50" />
        {/* </div> */}
        {/* <div className={classes.subSet}> */}
          INFO DE LOS PADRES
          <Card theme="simple" label="Correo" maxLength="20" />
          {/* <Card theme="simple" label="Teléfono convencional" maxLength="9" />
        <Card theme="simple" label="Teléfono celular" maxLength="10" />
        <Card theme="simple" label="Dirección" maxLength="50" /> */}
        {/* </div> */}
        {/* <div className={classes.subSet}> */}
          INFO DE LOS PADRES
          <Card theme="simple" label="Correo" maxLength="20" />
          {/* <Card theme="simple" label="Teléfono convencional" maxLength="9" />
        <Card theme="simple" label="Teléfono celular" maxLength="10" />
        <Card theme="simple" label="Dirección" maxLength="50" /> */}
        {/* </div> */}
        {/* <div className={classes.subSet}> */}
          INFO DE LOS PADRES
          <Card theme="simple" label="Correo" maxLength="20" />
          {/* <Card theme="simple" label="Teléfono convencional" maxLength="9" />
        <Card theme="simple" label="Teléfono celular" maxLength="10" />
        <Card theme="simple" label="Dirección" maxLength="50" /> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default MainContainer;
