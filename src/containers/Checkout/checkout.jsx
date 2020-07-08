import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/checkoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/contactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  //it renders before rendering child component # componentDidMount (after rendering whole compponent [parent&child])
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        totalPrice = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients, totalPrice });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutCountinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutCountinued={this.checkoutCountinuedHandler}
        ></CheckoutSummary>

        <Route
          path={`${this.props.match.path}/contact-data`}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
