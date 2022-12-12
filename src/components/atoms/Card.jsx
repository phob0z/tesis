import React, { useState } from "react";

import classes from "./Card.module.css";
// import Input from "./Input";
import InputLight from "./InputLight";

function Card(props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const valueChangeHandler = (event) => {
    // setCedulaTouched(true);
    setValue(event.target.value);
  };

  return (
    <div className={classes.cardContainer}>
      <div className={classes.label}>{props.label}</div>
      <div className={classes.inputBox}>
        <InputLight
          value={value}
          label={"Contraseña"}
          // type="password"
          onChange={valueChangeHandler}
          onBlur={console.log("Blur")}
          maxLength="30"
          // showRevealPassword={true}
        />
      </div>
      {error && <div className={classes.error}>error</div>}
    </div>
  );
}

export default Card;
