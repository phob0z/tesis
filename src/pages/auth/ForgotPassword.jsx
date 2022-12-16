import React, { Fragment, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

import Input from "../../components/atoms/Input";
import AccountIcon from "../../components/icons/AccountIcon";
import Button from "../../components/atoms/Button";
import EmailSent from "./EmailSent";
import AlertContext from "../../contexts/alert/AlertContext";

import classes from "./Auth.module.css";

function ForgotPassword() {
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const navigate = useNavigate();

  const [identificacion, setidentificacion] = useState("");
  const [identificacionTouched, setidentificacionTouched] = useState(false);
  const [identificacionError, setidentificacionError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (identificacion.trim() === "")
      setidentificacionError("Debe ingresar una identificación");
    else if (identificacion.trim().length < 10)
      setidentificacionError(
        "La identificación debe tener al menos 10 caracteres"
      );
    else if (identificacion.trim().length > 20)
      setidentificacionError(
        "La identificación debe tener menos de 20 caracteres"
      );
    else if (!identificacion.match(/^\w+$/))
      setidentificacionError("Debe ingresar una identificación válida");
    else setidentificacionError("");
  }, [identificacion]);

  const identificacionShowError =
    identificacionTouched && !!identificacionError;

  const identificacionChangeHandler = (event) => {
    setidentificacionTouched(true);
    setidentificacion(event.target.value);
  };

  const identificacionBlurHandler = () => {
    setidentificacionTouched(true);
  };

  const onForgotPassword = (event) => {
    event.preventDefault();
    setidentificacionTouched(true);

    if (identificacionError) {
      setModal({ title: "ERROR", message: identificacionError });
      setHasError(true);
      return;
    }

    setIsLoading(true);

    /*
      AQUÍ, LÓGICA PARA RECUPERAR LA CONTRASEÑA!!!
      - Con async await.
      - Si no hay errores cambiar hacer: setSent(true)

    try {
      const response = await axios.post(
        "http://localhost:8000/api/forgotPassword",
        { correo },
        { headers: { accept: "application/json" } }
      );
      // navigate("/");
    } catch (error) {
      console.log("Error: ", error.response.data.message);
    }

    */
    setSent(true);
  };

  setIsLoading(false);

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
            {/* Ingrese su correo para recuperar la contraseña */}
            Ingrese su identificación para recuperar la contraseña
          </span>
          <Input
            value={identificacion}
            label={"Identificación"}
            onChange={identificacionChangeHandler}
            onBlur={identificacionBlurHandler}
            maxLength="20"
            color="red"
          >
            <AccountIcon color="white" />
          </Input>
          {identificacionShowError && (
            <label className={classes.error}>{identificacionError}</label>
          )}
          <span className={classes.boxFooter}>&nbsp;</span>
        </div>
        <Button type="submit">Recuperar</Button>
        <Button onClick={onVolver}>Volver</Button>
      </form>
    </Fragment>
  );
}

export default ForgotPassword;
