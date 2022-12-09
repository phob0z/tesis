import React, { Fragment, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Input from "../../components/atoms/Input";
import AccountIcon from "../../components/icons/AccountIcon";
import Button from "../../components/atoms/Button";
import EmailSent from "./EmailSent";
import AlertContext from "../../contexts/alert/AlertContext";

import classes from "./Auth.module.css";


function ForgotPassword() {
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [correoTouched, setCorreoTouched] = useState(false);
  const [correoError, setCorreoError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!correo.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/))
      setCorreoError("Debe ingresar un correo válido");
    else if (correo.trim() === "") setCorreoError("Debe ingresar un correo");
    else setCorreoError("");
  }, [correo]);

  const cedulaShowError = correoTouched && !!correoError;

  const cedulaChangeHandler = (event) => {
    setCorreoTouched(true);
    setCorreo(event.target.value);
  };

  const cedulaBlurHandler = (event) => {
    setCorreoTouched(true);
  };

  const onForgotPassword = (e) => {
    e.preventDefault();
    setCorreoTouched(true);

    if (correoError) {
      setModal({ title: "ERROR", message: correoError });
      setHasError(true);
      return;
    }

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
            Ingrese su correo para recuperar la contraseña
          </span>
          <Input
            value={correo}
            label={"Correo"}
            onChange={cedulaChangeHandler}
            onBlur={cedulaBlurHandler}
            maxLength="30"
          >
            <AccountIcon color="white" />
          </Input>
          {cedulaShowError && (
            <label className={classes.error}>{correoError}</label>
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
