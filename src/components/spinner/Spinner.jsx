import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";

import classes from "./Spinner.module.css";
import Backdrop from "../atoms/Backdrop";
import AlertContext from "../../contexts/alert/AlertContext";

const Spinner = () => {
  const { isLoading } = useContext(AlertContext);
  return (
    <Fragment>
      <Backdrop show={isLoading ? true : false} />
      <div className={`${isLoading ? classes.show : classes.hide}`}>
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
