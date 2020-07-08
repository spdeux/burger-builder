import React from "react";

import classes from "./button.css";

const button = (props) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btntype]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
