import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button className={classes[props.clase]} type={props.type} onClick={props.onClick} disabled={props.disabled}>
      {props.label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  clase: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  label: "default label",
  type: "submit",
  clase: "botonRojo",
  /* onClick: () => {console.log("Boton habilitado")}, */
  onClick: () => {},
  disabled: false,
};

export default Button;
