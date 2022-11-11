import React from "react";
import PropTypes from "prop-types";

import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={classes.modal} onClick={props.onClick}>
      <div className={classes.header}>{props.title}</div>
      <div className={classes.body}>
        <div className={classes.message}>{props.message}</div>
      </div>
      <div className={classes.footer}>{props.footer}</div>
    </div>
  );
}

Modal.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  footer: PropTypes.string,
};

Modal.defaultProps = {
  onClick: () => {},
  title: "Título por defecto",
  message: "Mensaje por defecto",
  footer: "Para cerrar presione en cualquier parte"
};

export default Modal;
