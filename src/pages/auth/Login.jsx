import React, { Fragment, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

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
  const [cedulaError, setCedulaError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (cedula.trim().length !== 10)
      setCedulaError("La cédula debe tener 10 dígitos");
    else if (!/^[0-9]+$/.test(cedula))
      setCedulaError("La cédula solo puede contener números");
    else if (cedula.trim() === "") setCedulaError("Debe ingresar una cédula");
    else setCedulaError("");
  }, [cedula]);

  useEffect(() => {
    if (password.trim() === "")
      setPasswordError("Debe ingresar una contraseña");
    else setPasswordError("");
  }, [password]);

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

    if (cedulaError || passwordError) {
      setModal({
        title: "ERROR",
        message: cedulaError
          ? cedulaError + "\n" + passwordError
          : passwordError,
      });
      setHasError(true);
      return;
    }

    setIsLoading(true);

    try {
      let user = {
        name_1: "Leonel",
        last_name1: "Molina",
        role: "secretaria",
        avatar:
          "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png",
      };
      let token_type = "Bearer";
      let access_token = "1234567890";
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
            showRevealPassword={true}
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
