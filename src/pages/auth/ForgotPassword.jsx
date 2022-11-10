import React, { Fragment, useState } from "react";
// import axios from "axios";

import InputWithImage from "../../components/atoms/InputWithImage";
import { useNavigate } from "react-router-dom";
import AccountIcon from "../../components/icons/AccountIcon";
import Button from "../../components/atoms/Button";

import classes from "./Auth.module.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [cedula, setCedula] = useState("");

  const onForgotPassword = (e) => {
    e.preventDefault();
    navigate('/login/emailSent');
  }

  const onVolver = () => {
    navigate('/login');
  }

  const onChangeCedulaHandler = (event) => {
    setCedula(event.target.value);
  }

  return (
    <Fragment>
      <span className={classes.title}>
        Recuperar contraseña
      </span>
      <form className={classes.login} onSubmit={onForgotPassword}>
        <div className={classes.box}>
          <span className={classes.boxTitle}>Ingrese su cédula para recuperar</span>
          <InputWithImage value={cedula} onChange={onChangeCedulaHandler} label={"Cédula"}>
            <AccountIcon color="white" />
          </InputWithImage>
          <span className={classes.boxFooter}>&nbsp;</span>
        </div>
        <Button label="Recuperar" clase="botonRojo"/>
        <Button type="button" label="Volver" clase="botonRojo" onClick={onVolver}/>
      </form>
    </Fragment>
  );
}

export default ForgotPassword;
