import React, { useContext } from "react";
import Card from "../components/atoms/Card";
import AuthContext from "../contexts/auth/AuthContext";
import classes from "./Profile.module.css";

function ProfileSecretary() {
  const { user } = useContext(AuthContext);
  user.role = "Secretaria";
  return (
    <div className={classes.mainContainer}>
      <div className={classes.containerTitle}> Perfil </div>
      <div className={classes.subContainer}>
        <div className={classes.subSet}>
          INFO PERSONAL
          <Card theme="simple" label="Nombres" value={user.name} maxLength="35" />
          <Card theme="simple" label="Apellidos" value={user.last_name} maxLength="35" />
          <Card theme="simple" label="Cédula" value={user.identification} maxLength="20" />
          <Card theme="simple" label="Fecha de nacimiento" value={user.birthdate} maxLength="20" />
        </div>
        <div className={classes.subSet}>
          INFO DE CONTACTO
          <Card theme="simple" label="Correo" value={user.email} maxLength="20" />
          <Card theme="simple" label="Teléfono convencional" value={user.home_phone} maxLength="9" />
          <Card theme="simple" label="Teléfono celular" value={user.personal_phone} maxLength="10" />
          <Card theme="simple" label="Dirección" value={user.address} maxLength="50" />
        </div>
        <div className={classes.subSet}>
          CUENTA
          <Card theme="simple" label="Rol" value={user.role} maxLength="50" disabled />
          CAMBIAR CONTRASEÑA
          <Card theme="simple" type="password" showRevealPassword label="Cambiar contraseña" maxLength="50" />
          <Card theme="simple" type="password" showRevealPassword label="Confirmar contraseña" maxLength="50" />
        </div>
      </div>
    </div>
  );
}

export default ProfileSecretary;
