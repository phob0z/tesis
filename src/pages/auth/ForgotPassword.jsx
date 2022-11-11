import React, { Fragment, useState } from "react";
// import axios from "axios";

import InputWithImage from "../../components/atoms/InputWithImage";
import { useNavigate } from "react-router-dom";
import AccountIcon from "../../components/icons/AccountIcon";
import Button from "../../components/atoms/Button";
import EmailSent from "./EmailSent";

import classes from "./Auth.module.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [cedula, setCedula] = useState("");
  const [cedulaTouched, setCedulaTouched] = useState(false);
  const [sent, setSent] = useState(false);

  var cedulaError = "";

  if (cedulaTouched) {
    if (cedula.trim().length !== 10)
      cedulaError = "La cédula debe tener 10 dígitos";
    if (!/^[0-9]+$/.test(cedula))
      cedulaError = "La cédula solo puede contener números";
    if (cedula.trim() === "") cedulaError = "Debe ingresar una cédula";
  }

  const cedulaShowError = cedulaTouched && !!cedulaError;

  const cedulaChangeHandler = (event) => {
    setCedulaTouched(true);
    setCedula(event.target.value);
  };

  const cedulaBlurHandler = (event) => {
    setCedulaTouched(true);
  };

  const onForgotPassword = (e) => {
    e.preventDefault();
    setCedulaTouched(true);

    if (!cedula || !!cedulaError) {
      return;
    }

    /*
      AQUÍ, LÓGICA PARA RECUPERAR LA CONTRASEÑA!!!
      - Con async await.
      - Si no hay errores cambiar hacer: setSent(true)

    try {
      const response = await axios.post(
        "http://localhost:8000/api/forgotPassword",
        { cedula },
        { headers: { accept: "application/json" } }
      );
      // navigate("/");
    } catch (error) {
      console.log("Error: ", error.response.data.message);
    }

    */
    setSent(true);
  };

  const onVolver = () => {
    navigate("/login");
  };

  return sent ? (
    <EmailSent />
  ) : (
    <Fragment>
      <span className={classes.title}>Recuperar contraseña</span>
      <form className={classes.login} onSubmit={onForgotPassword}>
        <div className={classes.box}>
          <span className={classes.boxTitle}>
            Ingrese su cédula para recuperar
          </span>
          <InputWithImage
            value={cedula}
            label={"Cédula"}
            onChange={cedulaChangeHandler}            
            onBlur={cedulaBlurHandler}
          >
            <AccountIcon color="white" />
          </InputWithImage>
          {cedulaShowError && (
            <label className={classes.error}>{cedulaError}</label>
          )}
          <span className={classes.boxFooter}>&nbsp;</span>
        </div>
        <Button label="Recuperar" clase="botonRojo" />
        <Button
          type="button"
          label="Volver"
          clase="botonRojo"
          onClick={onVolver}
        />
      </form>
    </Fragment>
  );
}

export default ForgotPassword;
