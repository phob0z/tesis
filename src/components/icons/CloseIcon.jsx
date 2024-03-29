import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

const CloseIcon = (props) => {
  const [color, setColor] = useState("white");

  const onMouseOverHandler = () => {
    setColor("black");
  };

  const onMouseOutHandler = () => {
    setColor("white");
  };

  return (
    <svg
      data-icon="close-x-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45 45"
      height="1.3rem"
      width="1.3rem"
      className={props.className}
      onClick={props.onClick}
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
    >
      <path
        fill={color}
        d="m16.6 33.6 7.4-7.4 7.4 7.4 2.2-2.2-7.4-7.4 7.4-7.4-2.2-2.2-7.4 7.4-7.4-7.4-2.2 2.2 7.4
        7.4-7.4 7.4ZM24 44.3q-4.15 0-7.875-1.6-3.725-1.6-6.475-4.35Q6.9 35.6 5.3 31.9 3.7 28.2 3.7
        24t1.6-7.925q1.6-3.725 4.35-6.45Q12.4 6.9 16.1 5.3T24 3.7q4.2 0 7.925 1.6 3.725 1.6 6.45
        4.325T42.7 16.05q1.6 3.7 1.6 7.95 0 4.2-1.6 7.9t-4.325 6.45Q35.65 41.1 31.95 42.7q-3.7 1.6-7.95
        1.6Zm0-3.4q7.05 0 11.975-4.95T40.9 24q0-7.05-4.925-11.975T24 7.1q-7 0-11.95 4.925Q7.1 16.95
        7.1 24q0 7 4.95 11.95Q17 40.9 24 40.9ZM24 24Z"
      ></path>
    </svg>
  );
};

CloseIcon.propTypes = {
  color: PropTypes.string,
};

CloseIcon.defaultProps = {
  color: "#f3f3f3",
};

export default CloseIcon;
