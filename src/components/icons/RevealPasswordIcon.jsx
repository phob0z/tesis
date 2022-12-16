import React from "react";
import PropTypes from "prop-types";

const RevealPasswordIcon = (props) => {
  return (
    <svg
      data-icon="reveal-password-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 47 47"
      height="1.4rem"
      width="1.8rem"
    >
      <path
        fill={props.color}
        d="M24 31.5q3.55 0 6.025-2.475Q32.5 26.55 32.5 23q0-3.55-2.475-6.025Q27.55 14.5 24 14.5q-3.55 0-6.025 2.475Q15.5 19.45 15.5 23q0 3.55 2.475 6.025Q20.45 31.5 24 31.5Zm0-2.9q-2.35 0-3.975-1.625T18.4 23q0-2.35 1.625-3.975T24 17.4q2.35 0 3.975 1.625T29.6 23q0 2.35-1.625 3.975T24 28.6Zm0 9.4q-7.3 0-13.2-4.15Q4.9 29.7 2 23q2.9-6.7 8.8-10.85Q16.7 8 24 8q7.3 0 13.2 4.15Q43.1 16.3 46 23q-2.9 6.7-8.8 10.85Q31.3 38 24 38Z"
      ></path>
    </svg>
  );
};

RevealPasswordIcon.propTypes = {
  color: PropTypes.string,
};

RevealPasswordIcon.defaultProps = {
  color: "#f3f3f3",
};

export default RevealPasswordIcon;
