import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./logo.css";

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="MyBurger"></img>
    </div>
  );
};

export default Logo;
