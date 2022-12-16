import React from "react";
import Card from "../components/atoms/Card";
import classes from "./Profile.module.css";

function ProfileStudent() {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.containerOptions} />
      <div className={classes.subContainer}>
        <div className={classes.subSet}>
          INFO PERSONAL
          <Card theme="simple" label="Nombres" maxLength="35" disabled />
          <Card theme="simple" label="Apellidos" maxLength="35" disabled />
          <Card theme="simple" label="Cédula" maxLength="20" disabled />
          INFO DE LOS PADRES
          <Card
            theme="simple"
            label="Nombres del padre"
            maxLength="20"
            disabled
          />
          <Card
            theme="simple"
            label="Nombres de la madre"
            maxLength="20"
            disabled
          />
        </div>
        <div className={classes.subSet}>
          INFO DE CONTACTO
          <Card theme="simple" label="Correo" maxLength="20" disabled />
          <Card
            theme="simple"
            label="Teléfono convencional"
            maxLength="9"
            disabled
          />
          <Card
            theme="simple"
            label="Teléfono celular"
            maxLength="10"
            disabled
          />
          <Card theme="simple" label="Dirección" maxLength="50" disabled />
        </div>
        <div className={classes.subSet}>
          CUENTA
          <Card theme="simple" label="Contraseña" maxLength="50" />
        </div>
      </div>
    </div>
  );
}

export default ProfileStudent;
