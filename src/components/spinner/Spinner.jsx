import React, { Fragment } from "react";
import PropTypes from "prop-types";

import classes from "./Spinner.module.css";
import Backdrop from "../atoms/Backdrop";

const Spinner = (props) => {
  return (
    <Fragment>
      <Backdrop show={props.show}/>
      <div className={`${props.show ? classes.show : classes.hide}`}>
        <div className={classes.spinner}></div>
        <div className={classes.spinner2}></div>
      </div>
    </Fragment>
  );
};

Spinner.propTypes = {
  show: PropTypes.bool,
};

Spinner.defaultProps = {
  show: false,
};

export default Spinner;
