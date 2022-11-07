import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button className={classes[props.clase]} type={props.type} onClick={props.onClick}>
      {props.label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  clase: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  label: "default label",
  type: "submit",
  clase: "botonRojo",
  // onClick: () => {console.log("Default click function on button");},
};

export default Button;
