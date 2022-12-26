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

  const [identification, setIdentificacion] = useState("");
  const [identificationTouched, setIdentificacionTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [identificationError, setIdentificacionError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (identification.trim() === "")
      setIdentificacionError("Debe ingresar una identificación");
    else if (identification.trim().length < 5)
      setIdentificacionError(
        "La identificación debe tener al menos 5 caracteres"
      );
    else if (identification.trim().length > 15)
      setIdentificacionError(
        "La identificación debe tener menos de 15 caracteres"
      );
    else if (!identification.match(/^\w+$/))
      setIdentificacionError("Debe ingresar una identificación válida");
    else setIdentificacionError("");
  }, [identification]);

  useEffect(() => {
    if (password.trim() === "")
      setPasswordError("Debe ingresar una contraseña");
    else setPasswordError("");
  }, [password]);

  const identificationShowError =
    identificationTouched && !!identificationError;
  const passwordShowError = passwordTouched && !!passwordError;

  const identificationChangeHandler = (event) => {
    setIdentificacionTouched(true);
    setIdentificacion(event.target.value);
  };

  const identificationBlurHandler = () => {
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

    if (identificationError || passwordError) {
      setModal({
        title: "ERROR",
        message: identificationError
          ? identificationError + "\n" + passwordError
          : passwordError,
      });
      setHasError(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/login`,
        { identification, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const { access_token, token_type, user, avatar } = response.data.data;
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
            value={identification}
            label={"Identificación"}
            onChange={identificationChangeHandler}
            onBlur={identificationBlurHandler}
            maxLength="20"
          >
            <AccountIcon />
          </Input>
          {identificationShowError && (
            <label className={classes.error}>{identificationError}</label>
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
