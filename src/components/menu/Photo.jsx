import React from "react";
import PropTypes from "prop-types";

import classes from "./Photo.module.css";

function Photo(props) {
  return (
    <div className={classes.photoContainer}>
      <div className={classes.photoBox}>
        <div className={classes.photo}>
          <img src={props.src} alt={props.alt} onClick={props.onClick} />
        </div>
      </div>
    </div>
  );
}

Photo.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};

Photo.defaultProps = {
  src: "https://cdn-icons-png.flaticon.com/512/711/711769.png",
  alt: "Usuario",
  onClick: () => {},
};

export default Photo;
