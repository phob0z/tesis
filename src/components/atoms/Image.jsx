import React, { useEffect, useState, useRef } from "react";
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
      <label>Seleccionar</label>
      <input
        ref={chooseImage}
        type="file"
        accept="image/*"
        onChange={onImageChange}
      />
      <div className={classes.imageBox}>
        <div className={classes.image}>
          <img
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
  label: PropTypes.string,
  value: PropTypes.string,
  alt: PropTypes.string,
  onChange: PropTypes.func,
};

Image.defaultProps = {
  label: "",
  value: "https://www.hallmarktour.com/img/profile-img.jpg",
  alt: "Imagen de perfil",
  onChange: () => {},
};

export default Image;
