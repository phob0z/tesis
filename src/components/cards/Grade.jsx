import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import classes from "./Grade.module.css";
import Input from "../atoms/Input";

function Grade(props) {
  const [inputTouched, setInputTouched] = useState(false);
  const [error, setError] = useState(false);

  const onBlur = () => {
    setInputTouched(true);
  };

  useEffect(() => {
    setError(false);
    if (!props.value) {
      if (props.must) setError("Min 0.00\nMax 10.00");
    } else {
      switch (props.validation) {
        case "behaviour":
          if (!props.value.match(/^([ABCDEFabcdef])+$/))
            setError("[A,B,C,D,E,F]");
          break;
        default:
          let val = parseFloat(props.value);
          if (
            !props.value.match(/^[0-9]+[.]{0,1}[0-9]{0,3}$/) ||
            val > 10 ||
            val < 0
          )
            setError("Min 0.00\nMax 10.00");
          break;
      }
    }
  }, [props.value, props.must, inputTouched]);

  useEffect(() => {
    props.setError({ label: props.label, error: error });
    // eslint-disable-next-line
  }, [error]);

  return (
    <div className={classes.gradeContainer}>
      <div className={classes.inputBox}>
        <Input
          value={props.value}
          label={props.label}
          type={props.type}
          onChange={props.onChange}
          onBlur={onBlur}
          maxLength={props.maxLength}
          theme="blue"
          disabled={props.disabled}
          className={props.className}
        />
      </div>
      {props.validation && error && (
        <div className={classes.error}>{error}</div>
      )}
    </div>
  );
}

Grade.propTypes = {
  type: PropTypes.string,
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

Grade.defaultProps = {
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

export default Grade;