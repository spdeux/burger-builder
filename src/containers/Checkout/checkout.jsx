import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/checkoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/contactData";
import { connect } from "react-redux";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutCountinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
    return (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutCountinued={this.checkoutCountinuedHandler}
        ></CheckoutSummary>

        <Route
          path={`${this.props.match.path}/contact-data`}
          // Component={ContactData}
          render={() => (
            <ContactData
              ingredients={this.props.ings}
              totalPrice={this.props.price}
            />
          )}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
