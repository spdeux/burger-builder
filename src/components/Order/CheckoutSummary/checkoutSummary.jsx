import React from "react";
import Burger from "../../Burger/burger";
import Button from "../../UI/Button/button";
import classes from "./CheckoutSummary.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>we hope it taste well!!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btntype="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btntype="Success" clicked={props.checkoutCountinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
