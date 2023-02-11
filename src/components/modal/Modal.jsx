import React, { Fragment, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import classes from "./Modal.module.css";
import CloseIcon from "../icons/CloseIcon";
import Backdrop from "../atoms/Backdrop";
import AlertContext from "../../contexts/alert/AlertContext";

const Modal = () => {
  const { hasError, setHasError, setModal, modal } = useContext(AlertContext);
  useEffect(() => {
    if (modal.title && modal.message) setHasError(true);
    else setHasError(false);
  }, [modal.title, modal.message, setHasError]);

  return (
    <Fragment>
      <Backdrop show={hasError ? true : false} />
      <div
        className={`${classes.modal} ${hasError ? classes.show : classes.hide}`}
      >
        <div className={classes.header}>
          {modal.title}
          <CloseIcon
            className={classes.close}
            color="white"
            onClick={() => {
              setModal(false);
              setHasError(false);
              if (modal.message === "Usuario no autenticado.") {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.reload(true);
              }
            }}
          />
        </div>
        <div className={classes.body}>
          <div className={classes.message}>{modal.message}</div>
        </div>
        {/* <div className={classes.footer}>{props.footer}</div> */}
      </div>
    </Fragment>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  // footer: PropTypes.string,
};

Modal.defaultProps = {
  footer: "",
};

export default Modal;
