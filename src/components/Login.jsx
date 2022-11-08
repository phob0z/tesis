import axios from "axios";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import InputWithImage from "./InputWithImage";
import classes from "./Auth.module.css";
import AccountIcon from "./atoms/icons/AccountIcon";
import PasswordKeyIcon from "./atoms/icons/PasswordKeyIcon";
import Button from "./atoms/Button";

const Login = () => {
  const [cedula, setCedula] = useState("");
  const [cedulaTouched, setCedulaTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  var cedulaError = "";
  var passwordError = "";

  if (cedulaTouched) {
    if (cedula.trim().length < 10)
      cedulaError = "La cédula debe tener al menos 10 dígitos";
    if (!(/^[0-9]+$/.test(cedula)))
      cedulaError = "La cédula solo puede contener números";
    if (cedula.trim() === "")
      cedulaError = "Debe ingresar una cédula";
  }

  if (passwordTouched) {
    if (password.trim() === "")
      passwordError = "Debe ingresar una contraseña";
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
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8000/api/login",
    //     { cedula, password },
    //     { headers: { accept: "application/json" } }
    //   );
    //   console.log(response);
    //   const { access_token, token_type, user } = response.data.data;
    //   console.warn(access_token, token_type, user);
    //   // login(user, `${token_type} ${access_token}`);
    //   // navigate("/");
    // } catch (error) {
    //   console.log(error.response.data.message, "error");
    //   setCedula("");
    //   setPassword("");
    // }
    setCedulaTouched(true);

    if (!!cedulaError) {
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
          {cedulaShowError && <label className={classes.error}>{cedulaError}</label>}
          <InputWithImage
            value={password}
            onChange={passwordChangeHandler}
            label={"Contraseña"}
            type="password"
            onBlur={passwordBlurHandler}
          >
            <PasswordKeyIcon color="white" />
          </InputWithImage>
          {passwordShowError && <label className={classes.error}>{passwordError}</label>}
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
