import React from "react";
import PropTypes from "prop-types";

import classes from "./Spinner.module.css";

const Spinner = (props) => {
  return (
    <div
      className={`${
        props.show ? classes.show : classes.hide
      }`}
    >
      <div className={classes.spinner}></div>
      <div className={classes.spinner2}></div>
    </div>
  );
};

Spinner.propTypes = {
  show: PropTypes.bool,
};

Spinner.defaultProps = {
  show: false,
};

export default Spinner;
