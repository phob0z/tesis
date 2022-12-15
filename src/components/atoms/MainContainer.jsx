import React from "react";
import Card from "./Card";
import classes from "./MainContainer.module.css";

function MainContainer(props) {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.containerOptions} options={props.options} />
      <div className={classes.subContainer}>
        <Card label="Nombre" maxLength="20"/>
        <Card label="Apellido" maxLength="20"/>
        <Card label="Cédula" maxLength="20"/>
        <Card label="Correo" maxLength="20"/>
        <Card label="Teléfono" maxLength="20"/>
        <Card label="Teléfono celular" maxLength="20"/>
        <Card label="Dirección" maxLength="20"/>
        {/* <Card label="AZXZXCC" /> */}
        {/* <Card label="ZXCASD" />
        <Card label="ASDASD" />
        <Card label="AZXZXCC" />
        <Card label="ZXCASD" />
        <Card label="ASDASD" />
        <Card label="AZXZXCC" />
        <Card label="ZXCASD" />
        <Card label="ASDASD" /> */}
      </div>
    </div>
  );
}

export default MainContainer;
