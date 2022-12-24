import React, { Fragment, useContext, useState, useEffect } from "react";
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

  const [identificacion, setIdentificacion] = useState("");
  const [identificacionTouched, setIdentificacionTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [identificacionError, setIdentificacionError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    setIdentificacionError("");
  }, [identificacion]);

  useEffect(() => {
    setPasswordError("");
  }, [password]);

  const identificacionShowError =
    identificacionTouched && !!identificacionError;
  const passwordShowError = passwordTouched && !!passwordError;

  const identificacionChangeHandler = (event) => {
    setIdentificacionTouched(true);
    setIdentificacion(event.target.value);
  };

  const identificacionBlurHandler = () => {
    setIdentificacionTouched(true);
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
    setIdentificacionTouched(true);
    setPasswordTouched(true);

    if (identificacionError || passwordError) {
      setModal({
        title: "ERROR",
        message: identificacionError
          ? identificacionError + "\n" + passwordError
          : passwordError,
      });
      setHasError(true);
      return;
    }

    setIsLoading(true);

    try {
      let user = {
        name: "Leonel",
        last_name: "Molina",
        role: "secretary",
        avatar: "",
      };
      let avatar =
        "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png";
      let token_type = "Bearer";
      let access_token = "1234567890";
      user["avatar"] = avatar;
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
            value={identificacion}
            label={"Identificación"}
            onChange={identificacionChangeHandler}
            onBlur={identificacionBlurHandler}
            maxLength="20"
          >
            <AccountIcon />
          </Input>
          {identificacionShowError && (
            <label className={classes.error}>{identificacionError}</label>
          )}
          <Input
            value={password}
            label={"Contraseña"}
            type="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            maxLength="30"
            showRevealPassword={true}
          >
            <PasswordKeyIcon />
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