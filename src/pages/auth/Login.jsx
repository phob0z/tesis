import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Input from "../../components/atoms/Input";
import AccountIcon from "../../components/icons/AccountIcon";
import PasswordKeyIcon from "../../components/icons/PasswordKeyIcon";
import Button from "../../components/atoms/Button";
import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import classes from "./Auth.module.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const { setIsLoading, setHasError, setModal } = useContext(AlertContext);

  const [cedula, setCedula] = useState("");
  const [cedulaTouched, setCedulaTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  var cedulaError = false;
  var passwordError = false;

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

  const cedulaBlurHandler = () => {
    setCedulaTouched(true);
  };

  const passwordChangeHandler = (event) => {
    setPasswordTouched(true);
    setPassword(event.target.value);
  };

  const passwordBlurHandler = () => {
    setPasswordTouched(true);
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setCedulaTouched(true);
    setPasswordTouched(true);

    if (!cedula || cedulaError || !password || passwordError) {
      if (cedulaError) setModal({ title: "ERROR", message: cedulaError });
      else if (passwordError)
        setModal({ title: "ERROR", message: passwordError });
      if (cedulaError || passwordError) setHasError(true);
      return;
    }

    setIsLoading(true);

    let user = {
      name_1: "Leonel",
      last_name1: "Molina",
      role: "secretaria",
      avatar:
        "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png",
    };
    let token_type = "Bearer";
    let access_token = "1234567890";

    try {
      //   const response = await axios.post(
      //     `${process.env.REACT_APP_BACK_URL}/login/`,
      //     // "http://localhost:8000/api/login",
      //     { cedula, password },
      //     { headers: { accept: "application/json" } }
      //   );
      //   const { access_token, token_type, user } = response.data.data;
      login(user, `${token_type} ${access_token}`);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
      setHasError(true);
    }

    setIsLoading(false);
  };

  return (
    <Fragment>
      <span className={classes.title}>
        Sistema de gestión de notas Miguel de Santiago
      </span>
      <form className={classes.login} onSubmit={onLogin}>
        <div className={classes.box}>
          <span className={classes.boxTitle}>Ingrese para continuar</span>
          <Input
            value={cedula}
            label={"Cédula"}
            onChange={cedulaChangeHandler}
            onBlur={cedulaBlurHandler}
            maxLength="10"
          >
            <AccountIcon color="white" />
          </Input>
          {cedulaShowError && (
            <label className={classes.error}>{cedulaError}</label>
          )}
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
          <Link className={classes.boxFooter} to="forgotPassword">
            ¿Olvidó su contraseña?
          </Link>
        </div>
        <Button type="submit">Ingresar</Button>
      </form>
    </Fragment>
  );
};

export default Login;
