import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Input from "../../components/atoms/Input";
import PasswordKeyIcon from "../../components/icons/PasswordKeyIcon";
import Button from "../../components/atoms/Button";
import AlertContext from "../../contexts/alert/AlertContext";

import classes from "./Auth.module.css";

function ResetNewPassword() {
  const navigate = useNavigate();
  const { setIsLoading, setModal } = useContext(AlertContext);

  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  // console.log(location);
  const token = queryParameters.get("token");
  const identification = queryParameters.get("identification");
  console.log(token);
  console.log(identification);

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordTouched, setNewPasswordTouched] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [confirmationTouched, setConfirmationTouched] = useState(false);
  const [confirmationError, setConfirmationError] = useState("");

  useEffect(() => {
    if (newPassword.trim() === "")
      setNewPasswordError("El campo no puede estar vacío");
    else if (newPassword.length < 8)
      setNewPasswordError("La contraseña debe tener al menos 8 caracteres");
    else if (newPassword.length > 32)
      setNewPasswordError("La contraseña debe tener menos de 32 caracteres");
    else if (!newPassword.match(".*\\d.*"))
      setNewPasswordError("La contraseña debe tener al menos un número");
    else if (!newPassword.match(".*[a-z].*"))
      setNewPasswordError("La contraseña debe tener al menos una letra minúscula");
    else if (!newPassword.match(".*[A-Z].*"))
      setNewPasswordError("La contraseña debe tener al menos una letra mayúscula");
    else if (!newPassword.match(/(?=.*?[#?¿=_!¡°¬´|@$\-\\%^&*`~()[\]{};:'",<.>/+])/))
      setNewPasswordError(
        "La contraseña debe tener al menos un carácter especial"
      );
    else setNewPasswordError("");
  }, [newPassword]);

  useEffect(() => {
    if (newPassword !== confirmation)
      setConfirmationError("Las contraseñas no coinciden");
    else setConfirmationError("");
  }, [confirmation, newPassword]);

  const newPasswordShowError = newPasswordTouched && !!newPasswordError;
  const confirmationShowError = confirmationTouched && !!confirmationError;

  const newPasswordChangeHandler = (event) => {
    setNewPasswordTouched(true);
    setNewPassword(event.target.value);
  };

  const newPasswordBlurHandler = () => {
    setNewPasswordTouched(true);
  };

  const confirmationChangeHandler = (event) => {
    setConfirmationTouched(true);
    setConfirmation(event.target.value);
  };

  const confirmationBlurHandler = () => {
    setConfirmationTouched(true);
  };

  const onResetNewPassword = async(event) => {
    event.preventDefault();
    setNewPasswordTouched(true);
    setConfirmationTouched(true);

    if (newPasswordError || confirmationError) {
      setModal({
        title: "Error en CAMBIAR CONTRASEÑA",
        message: newPasswordError
          ? newPasswordError + "\n" + confirmationError
          : confirmationError,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/update-newPassword`,
        { password: newPassword, password_confirmation: confirmation, identification },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      setIsLoading(false);
      setModal({ title: "CORRECTO", message: response.data.message });
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error.response.data.message });
    }
  };

  const onVolver = () => {
    navigate("/login");
  };

  return (
    <Fragment>
      <span className={classes.title}>Reestablecer contraseña</span>
      <form className={classes.login} onSubmit={onResetNewPassword}>
        <div className={classes.box}>
          <span className={classes.boxTitle}>Ingrese la contraseña</span>
          <Input
            value={newPassword}
            label={"Contraseña"}
            type="newPassword"
            onChange={newPasswordChangeHandler}
            onBlur={newPasswordBlurHandler}
            maxLength="30"
            showRevealPassword
          >
            <PasswordKeyIcon />
          </Input>
          {newPasswordShowError && (
            <label className={classes.error}>{newPasswordError}</label>
          )}
          <Input
            value={confirmation}
            label={"Confirmación de contraseña"}
            type="newPassword"
            onChange={confirmationChangeHandler}
            onBlur={confirmationBlurHandler}
            maxLength="30"
            showRevealPassword
          >
            <PasswordKeyIcon />
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

export default ResetNewPassword;
