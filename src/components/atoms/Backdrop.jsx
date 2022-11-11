import React, { useState } from 'react'
import PropTypes from "prop-types";

import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  const [close, setClose] = useState(false);

  const onClickHandler = () => {
    setClose(true);
  }

  return (
    <div className={`${classes.backdrop} ${close? classes.close: ''}`} onClick={onClickHandler}>
      {props.children}
    </div>
  );
}

Backdrop.propTypes = {
  onClick: PropTypes.func,
};

Backdrop.defaultProps = {
  onClick: () => {},
};

export default Backdrop