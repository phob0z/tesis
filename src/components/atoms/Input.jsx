import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import classes from "./Input.module.css";
import DatePicker from "./DatePicker";
import Image from "./Image";

const Input = (props) => {
  const [focused, setFocussed] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [type, setType] = useState(props.type);

  const onFocus = () => {
    setFocussed(true);
  };

  const onBlur = (event) => {
    setFocussed(false);
    props.onBlur(event);
  };

  const onSetVisibility = () => {
    type === "password" ? setType("text") : setType("password");
    setVisibility(!visibility);
  };

  var theme;

  if (props.theme === "red") theme = classes.red;
  else if (props.theme === "blue") theme = classes.blue;
  else theme = classes.simple;

  var input;

  switch (props.type) {
    case "date":
      input = (
        <DatePicker
          onChange={(date) => {
            if (date) {
              const newDate = `${date.getFullYear()}-${
                date.getMonth() + 1 < 10 ? "0" : ""
              }${date.getMonth() + 1}-${
                date.getDate() < 10 ? "0" : ""
              }${date.getDate()}`;
              props.onChange(newDate);
            }
          }}
          value={props.value}
          disabled={props.disabled}
          minDate={props.minDate}
          maxDate={props.maxDate}
        />
      );
      break;
    case "image":
      input = (
        <Image
          label={props.label}
          value={props.value}
          onChange={props.onChange}
          alt={props.alt}
        />
      );
      break;
    case "textBig":
      input = (
        <textarea
          placeholder={`${focused ? "" : props.label}`}
          value={props.value}
          onChange={props.onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          maxLength={props.maxLength}
          disabled={props.disabled}
        />
      );
      break;
    case "select":
      input = (
        <select
          disabled={props.disabled}
          onChange={props.onChange}
          className={classes.filter}
          value={props.value ? props.value : ""}
        >
          {props.label && (
            <Fragment>
              <option className={classes.option} value="" disabled>
                {props.label}
              </option>
              {props.label !== "Periodos" && (
                <option className={classes.option} value="">
                  Ninguno
                </option>
              )}
            </Fragment>
          )}
          {props.options &&
            props.options.map((option) => {
              return (
                <option
                  className={classes.option}
                  key={option.id??""}
                  value={option.id??""}
                >
                  {option.name}
                </option>
              );
            })}
        </select>
      );
      break;
    default:
      input = (
        <input
          type={type}
          placeholder={`${focused ? "" : props.label}`}
          value={props.value}
          onChange={props.onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          maxLength={props.maxLength}
          disabled={props.disabled}
          style={type === "grade" ? { textAlign: "center" } : {}}
        />
      );
      break;
  }

  return (
    <Fragment>
      <div
        className={`${classes.container} ${classes[props.className]} ${theme} ${
          focused ? classes.focused : ""
        }`}
      >
        {(props.children !== undefined && (
          <div className={classes.imageBox}>{props.children}</div>
        )) ||
          (props.type !== "grade" && props.disabled && (
            <div className={classes.imageBox}>
              <div className={classes.imageBoxIcon}>
                <span className="material-symbols-outlined">lock</span>
              </div>
            </div>
          ))}
        <div
          className={`${classes.inputContainer} ${theme} ${
            focused ? classes.focused : ""
          }`}
        >
          {input}
          {props.theme === "red" ? (
            <label htmlFor={props.label}>{props.label}</label>
          ) : (
            ""
          )}
        </div>
        {props.showRevealPassword && (
          <div
            className={`${classes.revealPassword} ${theme}`}
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
  onChange: PropTypes.func,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  maxLength: PropTypes.string,
  showRevealPassword: PropTypes.bool,
  disabled: PropTypes.bool,
  theme: PropTypes.string,
  alt: PropTypes.string,
  options: PropTypes.array,
};

Input.defaultProps = {
  type: "text",
  value: "",
  onChange: () => "",
  label: "",
  onBlur: () => "",
  maxLength: "35",
  showRevealPassword: false,
  disabled: false,
  theme: "red",
  alt: "",
  options: [],
};

export default Input;
