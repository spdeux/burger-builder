import React, { Component } from "react";
import Aux from "../../../hoc/aux";
import Button from "../../UI/Button/button";

class OrderSummary extends Component {
  componentWillUpdate() {
    // console.log("compont will update");
  }

  render() {
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {Object.keys(this.props.ingredients).map((igKey) => {
            return (
              <li key={igKey}>
                <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
                {this.props.ingredients[igKey]}
              </li>
            );
          })}
        </ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btntype="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btntype="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
