import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classes from "./Input.module.css";
import { useState } from "react";

const Input = (props) => {
  const [focused, setFocussed] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [type, setType] = useState(props.type);

  const onFocus = () => {
    console.log("FOCUSED");
    setFocussed(true);
  };

  const onBlur = () => {
    setFocussed(false);
    props.onBlur();
  };

  const onSetVisibility = () => {
    type === "password" ? setType("text") : setType("password");
    setVisibility(!visibility);
  };

  var color = props.color === "red" ? classes.red : classes.blue;

  return (
    <Fragment>
      <div
        className={`${classes.container} ${color} ${
          focused ? classes.focused : ""
        }`}
      >
        {props.children !== undefined && (
          <div className={classes.imageBox}>{props.children}</div>
        )}
        <div
          className={`${classes.inputContainer} ${color} ${color} ${
            focused ? classes.focused : ""
          }`}
        >
          <input
            id={props.label}
            type={type}
            placeholder={`${focused ? "" : props.label}`}
            value={props.value}
            onChange={props.onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            maxLength={props.maxLength}
            disabled={props.disabled}
          />
          {props.color === "red" ? (
            <label htmlFor={props.label}>{props.label}</label>
          ) : (
            ""
          )}
        </div>
        {props.showRevealPassword && (
          <div
            className={`${classes.revealPassword} ${color}`}
            onClick={onSetVisibility}
          >
            <span className="material-symbols-outlined">
              {type === "password" ? "visibility" : "visibility_off"}
            </span>
          </div>
        )}
      </div>
    </Fragment>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  maxLength: PropTypes.string,
  showRevealPassword: PropTypes.bool,
  color: PropTypes.string,
  disabled: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  value: "",
  onChange: () => "",
  label: "default label",
  onBlur: () => "",
  maxLength: "10",
  showRevealPassword: false,
  color: "red",
  disabled: "",
};

export default Input;
