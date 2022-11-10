import React, { Fragment } from "react";
// import axios from "axios";

import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";

import classes from "./Auth.module.css";

function EmailSent() {
  const navigate = useNavigate();

  const onVolver = () => {
    navigate('/login');
  }

  return (
    <Fragment>
      <span className={classes.title}>
        Recuperar contraseña
      </span>
      <form className={classes.login}>
        <div className={classes.box}>
          <span className={classes.boxTitle}>Si la cédula se encuentra en la base de datos se enviará un mensaje al correo electrónico asociado.
Por favor revise su correo y siga las instrucciones.</span>
        </div>
        <Button type="button" label="Volver" clase="botonRojo" onClick={onVolver}/>
      </form>
    </Fragment>
  );
}

export default EmailSent;
