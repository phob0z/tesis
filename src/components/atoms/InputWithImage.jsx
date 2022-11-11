import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classes from "./InputWithImage.module.css";
import { useState } from "react";

const InputWithImage = (props) => {
  const [focussed, setFocussed] = useState(false);

  const onFocus = () => {
    setFocussed(true);
  };
  const onBlur = () => {
    setFocussed(false);
    props.onBlur();
  };

  return (
    <Fragment>
      <div className={classes.bigContainer}>
        {props.children !== undefined && (
          <div className={classes.imageBox}>{props.children}</div>
        )}
        <div className={`${classes.inputContainer} ${focussed ? classes.focussed : ""}`}>
          <input
            id={props.label}
            type={props.type}
            placeholder={`${focussed ? "" : props.label}`}
            value={props.value}
            onChange={props.onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            maxlength={props.maxlength}
          />
          <label htmlFor={props.label}>{props.label}</label>
        </div>
      </div>
    </Fragment>
  );
};

InputWithImage.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  focussed: PropTypes.bool,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  maxlength: PropTypes.string,
};

InputWithImage.defaultProps = {
  type: "text",
  value: "",
  onChange: () => "",
  focussed: false,
  label: "default label",
  onBlur: () => "",
  maxlength: "10",
};

export default InputWithImage;
