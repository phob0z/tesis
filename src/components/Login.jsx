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
  const [password, setPassword] = useState("");

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
  };

  const cedulaChangeHandler = (event) => {
    setCedula(event.target.value);
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
          >
            <AccountIcon color="white" />
          </InputWithImage>
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
