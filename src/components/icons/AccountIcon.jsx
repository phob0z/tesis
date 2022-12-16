import React from "react";
import PropTypes from "prop-types";

const AccountIcon = (props) => {
  return (
    <svg
      data-icon="account-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 47 47"
      height="1.8rem"
      width="1.8rem"
    >
      <path
        fill={props.color}
        d="M11.3 34.7q3.1-1.95 6.125-2.9T24 30.85q3.55 0 6.65 1 3.1 1 6.1 2.85 2.1-2.75
        2.95-5.275.85-2.525.85-5.425 0-7-4.775-11.775T24 7.45q-7 0-11.775 4.775T7.45 24q0
        2.9.85 5.4.85 2.5 3 5.3ZM24 25.85q-3.05 0-5.1-2.05t-2.05-5.1q0-3 2.05-5.075T24
        11.55q3.05 0 5.1 2.075t2.05 5.125q0 3-2.05 5.05T24 25.85Zm0 19.4q-4.4 0-8.275-1.675T8.95
        39q-2.9-2.9-4.55-6.75T2.75 24q0-4.4 1.675-8.275T9 8.975Q11.9 6.1 15.75 4.4q3.85-1.7
        8.3-1.7 4.4 0 8.25 1.7 3.85 1.7 6.725 4.575 2.875 2.875 4.575 6.75Q45.3 19.6 45.3
        24t-1.7 8.25Q41.9 36.1 39.025 39t-6.75 4.575Q28.4 45.25 24 45.25Z"
      ></path>
    </svg>
  );
};

AccountIcon.propTypes = {
  color: PropTypes.string,
};

AccountIcon.defaultProps = {
  color: "#f3f3f3",
};

export default AccountIcon;
