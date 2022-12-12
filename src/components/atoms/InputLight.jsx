import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classes from "./InputLight.module.css";
import { useState } from "react";

const InputLight = (props) => {
  const [focussed, setFocussed] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [type, setType] = useState(props.type);

  const onFocus = () => {
    setFocussed(true);
  };

  const onBlur = () => {
    setFocussed(false);
    props.onBlur();
  };

  const onSetVisibility = () => {
    type === "password"? setType("text"): setType("password");
    setVisibility(!visibility);
  }

  return (
    <Fragment>
      <div className={classes.bigContainer}>
        <div
          className={`${classes.inputContainer} ${
            focussed ? classes.focussed : ""
          }`}
        >
          <input
            id={props.label}
            type={type}
            placeholder={`${focussed ? "" : props.label}`}
            value={props.value}
            onChange={props.onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            maxLength={props.maxLength}
          />
        </div>
        {props.showRevealPassword && (
          <div className={classes.revealPassword} onClick={onSetVisibility}>
            <span className="material-symbols-outlined">
              {type === "password" ? "visibility" : "visibility_off"}
            </span>
          </div>
        )}
      </div>
    </Fragment>
  );
};

InputLight.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  focussed: PropTypes.bool,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  maxLength: PropTypes.string,
  showRevealPassword: PropTypes.bool,
};

InputLight.defaultProps = {
  type: "text",
  value: "",
  onChange: () => "",
  focussed: false,
  label: "default label",
  onBlur: () => "",
  maxLength: "10",
  showRevealPassword: false,
};

export default InputLight;
