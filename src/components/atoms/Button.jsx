import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={classes[props.className]}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: "button",
  className: "button",
  onClick: () => {},
  disabled: false,
};

export default Button;
