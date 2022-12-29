import React from "react";
import PropTypes from "prop-types";

import classes from "./OnOffInput.module.css";
import Button from "./Button";

const OnOffInput = (props) => {
  const onChangeState = () => {
    props.onChange(!props.value);
  };
  const onIcon = (
    <span style={{ cursor: "default" }} className="material-symbols-outlined">
      check_circle
    </span>
  );
  const offIcon = (
    <span style={{ cursor: "default" }} className="material-symbols-outlined">
      cancel
    </span>
  );
  return (
    <div className={classes.onOffBox}>
      <div className={`${props.value ? classes.onIcon : classes.offIcon}`}>
        {props.value ? onIcon : offIcon}
      </div>
      <div>
        <Button onClick={onChangeState} className="editButton">
          {props.value ? "Desactivar" : "Activar"}
        </Button>
      </div>
    </div>
  );
};

OnOffInput.propTypes = {
  state: PropTypes.bool,
};

OnOffInput.defaultProps = {
  value: true,
};

export default OnOffInput;
