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

  const errorCedula = () => {
    let mensaje = "";
    if (cedula.trim() === "")
      mensaje = "Debe ingresar una cédula";
    if (cedula.trim().length < 10)
      mensaje = "La cédula debe tener al menos 10 dígitos";
    return mensaje;
  }

  const mensajeCedula = errorCedula();

  if (!!mensajeCedula) {
    console.log(mensajeCedula);
  }

  const showCedulaError = !!mensajeCedula && cedulaTouched;

  const cedulaChangeHandler = (event) => {
    setCedula(event.target.value);
  };

  const cedulaBlurHandler = (event) => {
    setCedulaTouched(true);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    console.log(cedula, password);
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

    if (!errorCedula) {
      return;
    }

    setCedula("");
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
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
          {showCedulaError && <label className={classes.error}>{mensajeCedula}</label>}
          <InputWithImage
            value={password}
            onChange={passwordChangeHandler}
            label={"Contraseña"}
            type="password"
          >
            <PasswordKeyIcon color="white" />
          </InputWithImage>
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
