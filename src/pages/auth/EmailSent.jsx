import React, { Fragment } from "react";

import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";

import classes from "./Auth.module.css";

function EmailSent() {
  const navigate = useNavigate();

  const onVolver = () => {
    navigate("/login");
  };

  return (
    <Fragment>
      <span className={classes.title}>Correo Enviado</span>
      <form className={classes.login}>
        <div className={classes.box}>
          <span className={classes.boxTitle}>
            Si el correo se encuentra en la base de datos se enviará un mensaje
            al correo electrónico asociado. Por favor revise su correo y siga
            las instrucciones.
          </span>
        </div>
        <Button onClick={onVolver}>Volver</Button>
      </form>
    </Fragment>
  );
}

export default EmailSent;
