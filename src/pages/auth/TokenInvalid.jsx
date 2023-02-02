import React, { Fragment } from "react";

import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";

import classes from "./Auth.module.css";
import warning from "../../assets/images/warning.png";

function TokenInvalid() {
  const navigate = useNavigate();

  const onVolver = () => {
    navigate("/login");
  };

  return (
    <Fragment>
      <span className={classes.title}>Token Inválido</span>
      <form className={classes.login}>
        <img src={warning} alt="Imagen de alerta" width="75rem" />
        <div className={classes.box}>
          <span className={classes.boxTitle}>
            <div>El enlace utilizado es inválido o ya fue utilizado.</div>
            <br />
            <div>
              Por favor, intente recuperar su contraseña nuevamente o asegúrese
              de usar el enlace correcto.
            </div>
          </span>
        </div>
        <Button onClick={onVolver}>Volver</Button>
      </form>
    </Fragment>
  );
}

export default TokenInvalid;
