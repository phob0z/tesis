import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Input from "../../components/atoms/Input";
import PasswordKeyIcon from "../../components/icons/PasswordKeyIcon";
import Button from "../../components/atoms/Button";
import AlertContext from "../../contexts/alert/AlertContext";

import classes from "./Auth.module.css";

function ResetPassword() {
  const navigate = useNavigate();
  const { setHasError, setModal } = useContext(AlertContext);

  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  // console.log(location);
  const token = queryParameters.get("token");
  const email = queryParameters.get("email");

  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [confirmationTouched, setConfirmationTouched] = useState(false);
  const [confirmationError, setConfirmationError] = useState("");

  useEffect(() => {
    if (password.trim() === "")
      setPasswordError("Debe ingresar una contraseña");
    else if (password.length < 8)
      setPasswordError("La contraseña debe tener al menos 8 caracteres");
    else if (password.length > 32)
      setPasswordError("La contraseña debe tener menos de 32 caracteres");
    else if (!password.match(".*\\d.*"))
      setPasswordError("La contraseña debe tener al menos un número");
    else if (!password.match(".*[a-z].*"))
      setPasswordError("La contraseña debe tener al menos una letra minúscula");
    else if (!password.match(".*[A-Z].*"))
      setPasswordError("La contraseña debe tener al menos una letra mayúscula");
    else if (!password.match(/(?=.*?[#?=_!@$\-\\%^&*`~\(\)\[\]{};:'",<.>\/+])/))
      setPasswordError(
        "La contraseña debe tener al menos un carácter especial"
      );
    else setPasswordError("");
  }, [password]);

  useEffect(() => {
    if (password !== confirmation)
      setConfirmationError("Las contraseñas no coinciden");
    else setConfirmationError("");
  }, [confirmation, password]);

  const passwordShowError = passwordTouched && !!passwordError;
  const confirmationShowError = confirmationTouched && !!confirmationError;

  const passwordChangeHandler = (event) => {
    setPasswordTouched(true);
    setPassword(event.target.value);
  };

  const passwordBlurHandler = (event) => {
    setPasswordTouched(true);
  };

  const confirmationChangeHandler = (event) => {
    setConfirmationTouched(true);
    setConfirmation(event.target.value);
  };

  const confirmationBlurHandler = (event) => {
    setConfirmationTouched(true);
  };

  const onResetPassword = (e) => {
    e.preventDefault();
    setPasswordTouched(true);
    setConfirmationTouched(true);

    if (passwordError || confirmationError) {
      setModal({
        title: "ERROR",
        message: passwordError
          ? passwordError + "\n" + confirmationError
          : confirmationError,
      });
      setHasError(true);
      return;
    }

    /*
      AQUÍ, LÓGICA DE RESETEAR LA CONTRASEÑA!!!
      - Con async await.
      - Si es correcto, modal de confirmación que devuelva al login

    try {
      const response = await axios.post(
        "http://localhost:8000/api/resetPassword",
        { token, email, password, confirmation },
        { headers: { accept: "application/json" } }
      );
      navigate("/login");
    } catch (error) {
      console.log("Error: ", error.response.data.message);
    }
    */
    setModal({
      title: "CORRECTO",
      message: "Contraseña actualizada correctamente\nIngrese de nuevo",
    });
    setHasError(true);
    //stop
    navigate("/login");
  };

  const onVolver = () => {
    navigate("/login");
  };

  return (
    <Fragment>
      <span className={classes.title}>Reestablecer contraseña</span>
      <form className={classes.login} onSubmit={onResetPassword}>
        <div className={classes.box}>
          <span className={classes.boxTitle}>Ingrese la contraseña</span>
          <Input
            value={password}
            label={"Contraseña"}
            type="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            maxLength="30"
          >
            <PasswordKeyIcon color="white" />
          </Input>
          {passwordShowError && (
            <label className={classes.error}>{passwordError}</label>
          )}
          <Input
            value={confirmation}
            label={"Confirmación de contraseña"}
            type="password"
            onChange={confirmationChangeHandler}
            onBlur={confirmationBlurHandler}
            maxLength="30"
          >
            <PasswordKeyIcon color="white" />
          </Input>
          {confirmationShowError && (
            <label className={classes.error}>{confirmationError}</label>
          )}
          <span className={classes.boxFooter}>&nbsp;</span>
        </div>
        <Button type="submit">Cambiar</Button>
        <Button onClick={onVolver}>Volver</Button>
      </form>
    </Fragment>
  );
}

export default ResetPassword;
