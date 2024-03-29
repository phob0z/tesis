import React, { Fragment } from "react";

import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";

import classes from "./Auth.module.css";
import emailSent from "../../assets/images/emailSent.png";

function EmailSent() {
  const navigate = useNavigate();

  const onVolver = () => {
    navigate("/login");
  };

  return (
    <Fragment>
      <span className={classes.title}>Correo Enviado</span>
      <form className={classes.login}>
        <img src={emailSent} alt="Imagen de correo enviado" width="75rem" />
        <div className={classes.box}>
          <span className={classes.boxTitle}>
            <div>
              Si el correo se encuentra en la base de datos se enviará un
              mensaje al correo electrónico asociado.
            </div>
            <br />
            <div>
              Por favor revise su correo (incluyendo la carpeta SPAM) y siga las
              instrucciones.
            </div>
          </span>
        </div>
        <Button onClick={onVolver}>Volver</Button>
      </form>
    </Fragment>
  );
}

export default EmailSent;
