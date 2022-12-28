import React, { useEffect, useState, useRef, Fragment } from "react";
import PropTypes from "prop-types";

import classes from "./Image.module.css";

function Image(props) {
  const chooseImage = useRef();
  const [image, setImage] = useState(props.value);
  useEffect(() => {
    setImage(props.value);
  }, [props.value]);

  const onImageClick = () => {
    chooseImage.current.click();
  };

  const onImageChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (event) {
        setImage(event.target.result);
        props.onChange({ base64: event.target.result, file: file });
      };
    }
  };

  return (
    <div className={classes.imageInput}>
      <label htmlFor={props.label}>Seleccionar</label>
      <input
        ref={chooseImage}
        type="file"
        accept="image/*"
        id={props.label}
        onChange={onImageChange}
      />
      <div className={classes.imageBox}>
        <div className={classes.image}>
          <img
            id={props.label}
            src={image}
            alt={props.alt}
            onClick={onImageClick}
          />
        </div>
      </div>
    </div>
  );
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};

Image.defaultProps = {
  src: "https://www.hallmarktour.com/img/profile-img.jpg",
  alt: "Imagen de perfil",
  onClick: () => {},
};

export default Image;
