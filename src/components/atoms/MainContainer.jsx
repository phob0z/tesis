import React from "react";
import Card from "./Card";
import classes from "./MainContainer.module.css";

function MainContainer(props) {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.containerOptions} options={props.options} />
      <div className={classes.subContainer}>
        <Card label="Nombre" />
        <Card label="Apellido" />
        <Card label="ASDASDASD" />
        <Card label="QWEWQeqwe" />
        <Card label="NASD" />
        <Card label="ZXCZXCZXC" />
        <Card label="ASDASD" />
        <Card label="AZXZXCC" />
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
