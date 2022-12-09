import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classes from "./Input.module.css";
import { useState } from "react";

const Input = (props) => {
  const [focussed, setFocussed] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const onFocus = () => {
    setFocussed(true);
  };

  const onBlur = () => {
    setFocussed(false);
    props.onBlur();
  };

  const onSetVisibility = () => {
    
    setVisibility(!visibility);
  }

  return (
    <Fragment>
      <div className={classes.bigContainer}>
        {props.children !== undefined && (
          <div className={classes.imageBox}>{props.children}</div>
        )}
        <div
          className={`${classes.inputContainer} ${
            focussed ? classes.focussed : ""
          }`}
        >
          <input
            id={props.label}
            type={props.type}
            placeholder={`${focussed ? "" : props.label}`}
            value={props.value}
            onChange={props.onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            maxLength={props.maxLength}
            showRevealPassword={props.showRevealPassword}
          />
          <label htmlFor={props.label}>{props.label}</label>
        </div>
        {props.showRevealPassword && (
          <div className={classes.revealPassword} onClick={onSetVisibility}>
            <span class="material-symbols-outlined">
              {props.type === "password" ? "visibility" : "visibility_off"}
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
  focussed: PropTypes.bool,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  maxLength: PropTypes.string,
  showRevealPassword: PropTypes.bool,
};

Input.defaultProps = {
  type: "text",
  value: "",
  onChange: () => "",
  focussed: false,
  label: "default label",
  onBlur: () => "",
  maxLength: "10",
  showRevealPassword: false,
};

export default Input;
