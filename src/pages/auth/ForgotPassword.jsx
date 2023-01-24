import React, { Fragment, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Input from "../../components/atoms/Input";
import AccountIcon from "../../components/icons/AccountIcon";
import Button from "../../components/atoms/Button";
import EmailSent from "./EmailSent";
import AlertContext from "../../contexts/alert/AlertContext";

import classes from "./Auth.module.css";

function ForgotPassword() {
  const { setIsLoading, setModal } = useContext(AlertContext);

  const navigate = useNavigate();

  const [identification, setidentification] = useState("");
  const [identificationTouched, setidentificationTouched] = useState(false);
  const [identificationError, setidentificationError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (identification.trim() === "")
      setidentificationError("El campo no puede estar vacío");
    else if (identification.trim().length < 5)
      setidentificationError("Debe tener al menos 5 caracteres");
    else if (identification.trim().length > 15)
      setidentificationError("Debe tener menos de 15 caracteres");
    else if (!identification.match(/^\w+$/))
      setidentificationError("Solo puede contener letras o números");
    else setidentificationError("");
  }, [identification]);

  const identificationShowError =
    identificationTouched && !!identificationError;

  const identificationChangeHandler = (event) => {
    setidentificationTouched(true);
    setidentification(event.target.value);
  };

  const identificationBlurHandler = () => {
    setidentificationTouched(true);
  };

  const onForgotPassword = async (event) => {
    event.preventDefault();
    setidentificationTouched(true);

    if (identificationError) {
      setModal({ title: "ERROR", message: identificationError });
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_BACK_URL}/forgot-password`,
        { identification },
        { headers: { accept: "application/json" } }
      );
    } catch (error) {
      console.log("Error: ", error.response.data.message);
    }
    setIsLoading(false);
    setSent(true);
  };

  const onVolver = () => {
    navigate("/login");
  };

  return sent ? (
    <EmailSent />
  ) : (
    <Fragment>
      <span className={classes.title}>Recuperar contraseña</span>
      <form className={classes.login} onSubmit={onForgotPassword}>
        <div className={classes.box}>
          <span className={classes.boxTitle}>
            {/* Ingrese su correo para recuperar la contraseña */}
            Ingrese su identificación para recuperar la contraseña
          </span>
          <Input
            value={identification}
            label={"Identificación"}
            onChange={identificationChangeHandler}
            onBlur={identificationBlurHandler}
            maxLength="15"
            color="red"
          >
            <AccountIcon />
          </Input>
          {identificationShowError && (
            <label className={classes.error}>{identificationError}</label>
          )}
          <span className={classes.boxFooter}>&nbsp;</span>
        </div>
        <Button type="submit">Recuperar</Button>
        <Button onClick={onVolver}>Volver</Button>
      </form>
    </Fragment>
  );
}

export default ForgotPassword;
