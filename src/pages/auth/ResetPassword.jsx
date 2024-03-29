import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Input from "../../components/atoms/Input";
import PasswordKeyIcon from "../../components/icons/PasswordKeyIcon";
import Button from "../../components/atoms/Button";
import AlertContext from "../../contexts/alert/AlertContext";

import classes from "./Auth.module.css";
import TokenInvalid from "./TokenInvalid";

function ResetPassword() {
  const navigate = useNavigate();
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordTouched, setNewPasswordTouched] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [confirmationTouched, setConfirmationTouched] = useState(false);
  const [confirmationError, setConfirmationError] = useState("");
  const [token, setToken] = useState();
  const [identification, setIdentification] = useState();
  const [tokenValid, setTokenValid] = useState();

  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);

  const checkToken = async () => {
    if (token && identification) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACK_URL}/check-link`,
          {
            identification: identification,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        if (response.status === 200) setTokenValid(true);
      } catch (error) {
        setTokenValid(false);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setToken(queryParameters.get("token") ?? "");
    setIdentification(queryParameters.get("identification") ?? "");
    console.log(queryParameters.get("token"));
    console.log(queryParameters.get("identification"));
    if (
      !queryParameters.get("token") ||
      !queryParameters.get("identification")
    ) {
      setModal({
        title: "Error en ENLACE",
        message: "El enlace utilizado no es correcto",
      });
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line
  }, [token, identification]);

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
      setNewPasswordError(
        "La contraseña debe tener al menos una letra minúscula"
      );
    else if (!newPassword.match(".*[A-Z].*"))
      setNewPasswordError(
        "La contraseña debe tener al menos una letra mayúscula"
      );
    else if (
      !newPassword.match(/(?=.*?[#?¿=_!¡°¬´|@$\-\\%^&*`~()[\]{};:'",<.>/+])/)
    )
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

  const onResetPassword = async (event) => {
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
        `${process.env.REACT_APP_BACK_URL}/reset-password`,
        {
          password: newPassword,
          password_confirmation: confirmation,
          token: token,
          identification: identification,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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

  return tokenValid === undefined ? (
    <div />
  ) : tokenValid === true ? (
    <Fragment>
      <span className={classes.title}>Reestablecer contraseña</span>
      <form className={classes.login} onSubmit={onResetPassword}>
        <div className={classes.box}>
          <span className={classes.boxTitle}>Ingrese la contraseña</span>
          <Input
            value={newPassword}
            label={"Contraseña"}
            type="password"
            onChange={newPasswordChangeHandler}
            onBlur={newPasswordBlurHandler}
            maxLength="30"
            showRevealPassword={true}
          >
            <PasswordKeyIcon />
          </Input>
          {newPasswordShowError && (
            <label className={classes.error}>{newPasswordError}</label>
          )}
          <Input
            value={confirmation}
            label={"Confirmación de contraseña"}
            type="password"
            onChange={confirmationChangeHandler}
            onBlur={confirmationBlurHandler}
            maxLength="30"
            showRevealPassword={true}
          >
            <PasswordKeyIcon />
          </Input>
          {confirmationShowError && (
            <label className={classes.error}>{confirmationError}</label>
          )}
          <span className={classes.boxFooter}>&nbsp;</span>
        </div>
        <Button type="submit">Cambiar</Button>
        <span style={{ height: "1rem" }} />
        <Button onClick={onVolver}>Volver</Button>
      </form>
    </Fragment>
  ) : (
    <TokenInvalid />
  );
}

export default ResetPassword;
