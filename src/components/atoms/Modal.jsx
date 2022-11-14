import React, { Fragment } from "react";
import PropTypes from "prop-types";

import classes from "./Modal.module.css";
import CloseIcon from "../icons/CloseIcon";
import Backdrop from "./Backdrop";

const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop show={props.show}/>
      <div
        className={`${classes.modal} ${
          props.show ? classes.show : classes.hide
        }`}
      >
        <div className={classes.header}>
          {props.title}
          <CloseIcon
            className={classes.close}
            color="white"
            onClick={props.close}
          />
        </div>
        <div className={classes.body}>
          <div className={classes.message}>{props.message}</div>
        </div>
        {/* <div className={classes.footer}>{props.footer}</div> */}
      </div>
    </Fragment>
  );
};

Modal.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  footer: PropTypes.string,
  show: PropTypes.bool,
  close: PropTypes.func,
};

Modal.defaultProps = {
  onClick: () => {},
  title: "Título por defecto",
  message: "Mensaje por defecto",
  footer: "",
  show: false,
  close: () => {},
};

export default Modal;
