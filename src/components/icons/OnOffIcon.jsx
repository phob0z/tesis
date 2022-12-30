import React from 'react';
import classes from "./OnOffIcon.module.css";

function OnOffIcon(props) {
  const onIcon = (
    <span className="material-symbols-outlined">
      check_circle
    </span>
  );
  const offIcon = (
    <span className="material-symbols-outlined">
      cancel
    </span>
  );

  return (
      <div className={`${props.state ? classes.onIcon : classes.offIcon}`}>
        {props.state ? onIcon : offIcon}
      </div>
  )
}

export default OnOffIcon;