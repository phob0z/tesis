import React, { useState } from "react";

import classes from "./Card.module.css";
import Input from "./Input";

function Card(props) {
  const [value, setValue] = useState("");
  // const [error, setError] = useState(false);

  const valueChangeHandler = (event) => {
    // setCedulaTouched(true);
    setValue(event.target.value);
  };

  return (
    <div className={classes.cardContainer}>
      <div className={classes.label}>{props.label}</div>
      <div className={classes.inputBox}>
        <Input
          value={value}
          label={props.label}
          type={props.type}
          onChange={valueChangeHandler}
          // onBlur={onBlur}
          maxLength={props.maxLength}
          color={props.color}
          showRevealPassword={props.showRevealPassword}
          disabled={props.disabled}
        />
      </div>
      {/* {error && <div className={classes.error}>error</div>} */}
    </div>
  );
}

export default Card;
