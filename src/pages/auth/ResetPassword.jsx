import React, { Fragment, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

import Input from "../../components/atoms/Input";
import PasswordKeyIcon from "../../components/icons/PasswordKeyIcon";
import Button from "../../components/atoms/Button";
import AlertContext from "../../contexts/alert/AlertContext";

import classes from "./Auth.module.css";

function ResetPassword() {
  const navigate = useNavigate();
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  // console.log(location);
  const token = queryParameters.get("token");
  const email = queryParameters.get("email");

  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [confirmationTouched, setConfirmationTouched] = useState(false);
  // const [sent, setSent] = useState(false);

  var passwordError = "";
  var confirmationError = "";

  if (passwordTouched) {
    if (password.trim() === "") passwordError = "Debe ingresar una contraseña";
    else if (password.length < 8)
      passwordError = "La contraseña debe tener al menos 8 caracteres";
    else if (password.length > 32)
      passwordError = "La contraseña debe tener menos de 32 caracteres";
    else if (!password.match(".*\\d.*"))
      passwordError = "La contraseña debe tener al menos un número";
    else if (!password.match(".*[a-z].*"))
      passwordError = "La contraseña debe tener al menos una letra minúscula";
    else if (!password.match(".*[A-Z].*"))
      passwordError = "La contraseña debe tener al menos una letra mayúscula";
    // else if (!password.match(".*[*.!@#$%^&(){}[]:'\";<>,.?/~`_+-=|\\].*"))
    else if (!password.match(/(?=.*?[#?=_!@$\-\\%^&*`~\(\)\[\]{};:'",<.>\/+])/))
      passwordError = "La contraseña debe tener al menos un carácter especial";
  }

  if (confirmationTouched) {
    if (password !== confirmation)
      confirmationError = "Las contraseñas no coinciden";
  }

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

    if (!password || !!passwordError || !confirmation || !!confirmationError) {
      if (!!passwordError)
        setModal({ title: "ERROR", message: passwordError });
      if (!!confirmationError)
        setModal({ title: "ERROR", message: confirmationError });
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

    navigate("/login");
    // setSent(true);
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
