import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

import classes from "./Card.module.css";
import Input from "../atoms/Input";

function Card(props) {
  const [inputTouched, setInputTouched] = useState(false);
  const [error, setError] = useState(false);

  const onBlur = () => {
    setInputTouched(true);
  };

  useEffect(() => {
    setError(false);
    if (!props.value) {
      if (props.must) setError("El campo no puede estar vacío");
    } else {
      switch (props.validation) {
        case "text":
          if (!props.value.match(/^([a-zA-Z\s]|[à-ú]|[À-Ú])+$/))
            setError("Solo puede contener letras o espacios");
          break;
        case "identification":
          if (props.value.trim().length < 5)
            setError("Debe tener al menos 5 caracteres");
          else if (props.value.trim().length > props.maxLength)
            setError(`Debe tener menos de ${props.maxLength} caracteres`);
          else if (!props.value.match(/^\w+$/))
            setError("Solo puede contener letras o números");
          break;
        case "code":
          if (props.value.trim().length > 5)
            setError("Debe tener menos de 5 caracteres");
          else if (!props.value.match(/^\w+$/))
            setError("Solo puede contener letras o números");
          break;
        case "cedula":
          if (props.value.trim().length !== 10)
            setError("La cédula debe tener 10 dígitos");
          else if (!/^[0-9]+$/.test(props.value))
            setError("La cédula solo puede contener números");
          break;
        case "date":
          break;
        case "email":
          if (props.value.trim().length > props.maxLength)
            setError(`Debe tener menos de ${props.maxLength} caracteres`);
          else if (
            // !props.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)
            !props.value.match(/^(\w[.-]?)*@(\w[.-]?)*(\.\w{2,})+$/)
          )
            setError("Debe ingresar un correo válido");
          break;
        case "homePhone":
          if (!props.value.match(/^[0-9]+$/))
            setError("Solo puede contener números");
          else if (props.value.trim().length !== 9)
            setError("Debe tener 9 dígitos");
          break;
        case "personalPhone":
          if (!props.value.match(/^[0-9]+$/))
            setError("Solo puede contener números");
          else if (props.value.trim().length !== 10)
            setError("Debe tener 10 dígitos");
          break;
        case "password":
          if (props.value.length < 8)
            setError("La contraseña debe tener al menos 8 caracteres");
          else if (props.value.trim().length > props.maxLength)
            setError(`Debe tener menos de ${props.maxLength} caracteres`);
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
            else if (props.value.trim().length > props.maxLength)
              setError(`Debe tener menos de ${props.maxLength} caracteres`);
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
              setError(
                "La contraseña debe tener al menos un carácter especial"
              );
          }
          break;
        case "textBig":
          break;
        case "select":
          break;
        case "nonEmpty":
          break;
        case "parallel":
          if (!props.value.match(/^\w+$/))
            setError("Solo puede contener letras o números");
          else if (props.value.trim().length > props.maxLength)
            setError(`Debe tener menos de ${props.maxLength} caracteres`);
          break;
        case "course":
          if (!props.value.match(/^(\w+|\s|[à-ú]|[À-Ú])+$/))
            setError("Solo puede contener letras, números o espacios");
          else if (props.value.trim().length > props.maxLength)
            setError(`Debe tener menos de ${props.maxLength} caracteres`);
          break;
        case "specialty":
          if (!props.value.match(/^(\w+|\s|[à-ú]|[À-Ú])+$/))
            setError("Solo puede contener letras, números o espacios");
          else if (props.value.trim().length > props.maxLength)
            setError(`Debe tener menos de ${props.maxLength} caracteres`);
          break;
        case "academicYear":
          if (props.value.trim().length > props.maxLength)
            setError(`Debe tener menos de ${props.maxLength} caracteres`);
          break;
        case "grade":
          if (
            !props.value.match(
              /^(([0-1][0-9]{0,1})([.][0-9]{1,2}){0,1})$|(20([.][0]{1,2}){0,1})$/
            )
          )
            setError("Min 0.00\nMax 20.00");
          break;
        default:
          break;
      }
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
      {props.children ? (
        props.children
      ) : (
        <Fragment>
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
              alt={props.alt}
              options={props.options}
              minDate={props.minDate}
              maxDate={props.maxDate}
            />
          </div>
          {error && <div className={classes.error}>{error}</div>}
        </Fragment>
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
  setError: PropTypes.func,
  alt: PropTypes.string,
  options: PropTypes.array,
  must: PropTypes.bool,
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
  setError: () => "",
  alt: "",
  options: [],
  must: false,
};

export default Card;
