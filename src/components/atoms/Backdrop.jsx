import React from "react";
import PropTypes from "prop-types";

import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  return (
    <div
      className={`${classes.backdrop} ${
        props.show ? classes.show : classes.hide
      }`}
    />
  );
};

Backdrop.propTypes = {
  show: PropTypes.bool,
};

Backdrop.defaultProps = {
  show: false,
};

export default Backdrop;
