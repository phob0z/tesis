import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import InputWithImage from "../../components/atoms/InputWithImage";
import AccountIcon from "../../components/icons/AccountIcon";
import PasswordKeyIcon from "../../components/icons/PasswordKeyIcon";
import Button from "../../components/atoms/Button";
import AuthContext from "../../contexts/auth/AuthContext";

import classes from "./Auth.module.css";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [cedula, setCedula] = useState("");
  const [cedulaTouched, setCedulaTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  var cedulaError = "";
  var passwordError = "";

  if (cedulaTouched) {
    if (cedula.trim().length !== 10)
      cedulaError = "La cédula debe tener 10 dígitos";
    if (!/^[0-9]+$/.test(cedula))
      cedulaError = "La cédula solo puede contener números";
    if (cedula.trim() === "") cedulaError = "Debe ingresar una cédula";
  }

  if (passwordTouched) {
    if (password.trim() === "") passwordError = "Debe ingresar una contraseña";
  }

  const cedulaShowError = cedulaTouched && !!cedulaError;
  const passwordShowError = passwordTouched && !!passwordError;

  const cedulaChangeHandler = (event) => {
    setCedulaTouched(true);
    setCedula(event.target.value);
  };

  const cedulaBlurHandler = (event) => {
    setCedulaTouched(true);
  };

  const passwordChangeHandler = (event) => {
    setPasswordTouched(true);
    setPassword(event.target.value);
  };

  const passwordBlurHandler = (event) => {
    setPasswordTouched(true);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setCedulaTouched(true);
    setPasswordTouched(true);

    try {
      const response = await axios.post(
        // "https://phob0z-fakeback.herokuapp.com/api/login",
        "http://localhost:8000/api/login",
        { cedula, password },
        { headers: { accept: "application/json" } }
      );
      const { access_token, token_type, user } = response.data.data;
      console.warn(access_token, token_type, user);
      login(user, `${token_type} ${access_token}`);
      // navigate("/");
    } catch (error) {
      console.log(error.response.data.message, "error");
      // setCedula("");
      // setPassword("");
    }

    if (!!cedulaError || !!passwordError) {
      console.log("Existe error, no enviar");
      return;
    }

    console.log("NO existe error, enviar");
    setCedula("");
    setPassword("");
  };

  return (
    <Fragment>
      <span className={classes.title}>
        Sistema de gestión de notas Miguel de Santiago
      </span>
      <form className={classes.login} onSubmit={onLogin}>
        <div className={classes.box}>
          <span className={classes.boxTitle}>Ingrese para continuar</span>
          <InputWithImage
            value={cedula}
            onChange={cedulaChangeHandler}
            label={"Cédula"}
            onBlur={cedulaBlurHandler}
          >
            <AccountIcon color="white" />
          </InputWithImage>
          {cedulaShowError && (
            <label className={classes.error}>{cedulaError}</label>
          )}
          <InputWithImage
            value={password}
            onChange={passwordChangeHandler}
            label={"Contraseña"}
            type="password"
            onBlur={passwordBlurHandler}
          >
            <PasswordKeyIcon color="white" />
          </InputWithImage>
          {passwordShowError && (
            <label className={classes.error}>{passwordError}</label>
          )}
          <Link className={classes.boxFooter} to="forgotPassword">
            ¿Olvidó su contraseña?
          </Link>
        </div>
        <Button label="Ingresar" clase="botonRojo" />
      </form>
    </Fragment>
  );
};

export default Login;
