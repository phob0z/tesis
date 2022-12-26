import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import classes from "./Card.module.css";
import Input from "./Input";

function Card(props) {
  const [inputTouched, setInputTouched] = useState(false);
  const [error, setError] = useState(false);

  const onBlur = () => {
    setInputTouched(true);
  };

  useEffect(() => {
    setError(false);
    switch (props.validation) {
      case "text":
        if (!props.value) setError("El campo no puede estar vacío");
        else if (!props.value.match(/^[a-zA-Z\s]+$/))
          setError("Solo puede contener letras o espacios");
        break;
      case "identification":
        if (!props.value) setError("El campo no puede estar vacío");
        else if (props.value.trim().length < 5)
          setError("Debe tener al menos 5 caracteres");
        else if (props.value.trim().length > 15)
          setError("Debe tener menos de 15 caracteres");
        else if (!props.value.match(/^\w+$/))
          setError("Solo puede contener letras o números");
        break;
      case "cedula":
        if (!props.value) setError("Debe ingresar una cédula");
        else if (props.value.trim().length !== 10)
          setError("La cédula debe tener 10 dígitos");
        else if (!/^[0-9]+$/.test(props.value))
          setError("La cédula solo puede contener números");
        break;
      case "date":
        if (!props.value) setError("El campo no puede estar vacío");
        break;
      case "email":
        if (!props.value) setError("El campo no puede estar vacío");
        else if (
          !props.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)
        )
          setError("Debe ingresar un correo válido");
        break;
      case "homePhone":
        if (!props.value) setError("El campo no puede estar vacío");
        else if (!props.value.match(/^[0-9]+$/))
          setError("Solo puede contener números");
        else if (props.value.trim().length !== 9)
          setError("Debe tener 9 dígitos");
        break;
      case "personalPhone":
        if (!props.value) setError("El campo no puede estar vacío");
        else if (!props.value.match(/^[0-9]+$/))
          setError("Solo puede contener números");
        else if (props.value.trim().length !== 10)
          setError("Debe tener 10 dígitos");
        break;
      case "password":
        if (!props.value) setError("El campo no puede estar vacío");
        else if (props.value.length < 8)
          setError("La contraseña debe tener al menos 8 caracteres");
        else if (props.value.length > 32)
          setError("La contraseña debe tener menos de 32 caracteres");
        else if (!props.value.match(".*\\d.*"))
          setError("La contraseña debe tener al menos un número");
        else if (!props.value.match(".*[a-z].*"))
          setError("La contraseña debe tener al menos una letra minúscula");
        else if (!props.value.match(".*[A-Z].*"))
          setError("La contraseña debe tener al menos una letra mayúscula");
        else if (
          !props.value.match(
            /(?=.*?[#?¿=_!¡°¬´|@$\-\\%^&*`~()[\]{};:'",<.>/+])/
          )
        )
          setError("La contraseña debe tener al menos un carácter especial");
        break;
      case "changePassword":
        if (props.value) {
          if (props.value.length < 8)
            setError("La contraseña debe tener al menos 8 caracteres");
          else if (props.value.length > 32)
            setError("La contraseña debe tener menos de 32 caracteres");
          else if (!props.value.match(".*\\d.*"))
            setError("La contraseña debe tener al menos un número");
          else if (!props.value.match(".*[a-z].*"))
            setError("La contraseña debe tener al menos una letra minúscula");
          else if (!props.value.match(".*[A-Z].*"))
            setError("La contraseña debe tener al menos una letra mayúscula");
          else if (
            !props.value.match(
              /(?=.*?[#?¿=_!¡°¬´|@$\-\\%^&*`~()[\]{};:'",<.>/+])/
            )
          )
            setError("La contraseña debe tener al menos un carácter especial");
        }
        break;
      default:
        if (!props.value) setError("El campo no puede estar vacío");
        break;
    }
    // eslint-disable-next-line
  }, [props.value, inputTouched]);

  useEffect(() => {
    props.setError({ label: props.label, error: error });
    // eslint-disable-next-line
  }, [error]);

  return (
    <div className={classes.cardContainer}>
      <div className={classes.label}>{props.label}</div>
      <div className={classes.inputBox}>
        <Input
          value={props.value}
          label={props.label}
          type={props.type}
          onChange={props.onChange}
          onBlur={onBlur}
          maxLength={props.maxLength}
          theme={props.theme}
          showRevealPassword={props.showRevealPassword}
          disabled={props.disabled}
        />
      </div>
      {error && (
        <div onChange={props.cardError} className={classes.error}>
          {error}
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  maxLength: PropTypes.string,
  showRevealPassword: PropTypes.bool,
  disabled: PropTypes.bool,
  theme: PropTypes.string,
  validation: PropTypes.string,
  cardError: PropTypes.func,
  setError: PropTypes.func,
};

Card.defaultProps = {
  type: "text",
  value: "",
  onChange: () => "",
  label: "",
  maxLength: "",
  showRevealPassword: false,
  disabled: false,
  theme: "simple",
  validation: "",
  cardError: () => "",
  setError: () => "",
};

export default Card;
