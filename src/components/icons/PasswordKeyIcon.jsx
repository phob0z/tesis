import React from "react";
import PropTypes from "prop-types";

const PasswordKeyIcon = (props) => {
  return (
    <svg
      data-icon="password-key-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 47 47"
      height="1.8rem"
      width="1.8rem"
    >
      <path
        fill={props.color}
        d="M14 30.45q-2.7 0-4.575-1.875T7.55 24q0-2.7 1.875-4.575T14 17.55q2.7 0 4.575
        1.875T20.45 24q0 2.7-1.875 4.575T14 30.45Zm0 6.7q4.3 0 7.7-2.45 3.4-2.45
        4.45-6.5h1.4l3.25 3.3 4.55-4.6 5 4.55 7.2-7.6-4.35-4.15H26.15q-1.2-3.95-4.425-6.4Q18.5
        10.85 14 10.85q-5.5 0-9.325 3.825Q.85 18.5.85 24q0 5.45 3.85 9.3 3.85 3.85 9.3 3.85Z"
      ></path>
    </svg>
  );
};

PasswordKeyIcon.propTypes = {
  color: PropTypes.string,
};

PasswordKeyIcon.defaultProps = {
  color: "#f3f3f3",
};

export default PasswordKeyIcon;
