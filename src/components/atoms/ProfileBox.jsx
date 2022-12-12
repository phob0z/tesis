import React from 'react'

import classes from "./ProfileBox.module.css"

function ProfileBox() {
  return (
    <div className={classes.boxContainer}>
        <div className={classes.title}>Titulo</div>
        <div className={classes.inputBox}><input disabled={props.disabled} type="text"></input></div>
        <div className={classes.title}>error</div>
    </div>
  )
}

export default ProfileBox;