import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/checkoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/contactData";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutCountinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    console.log("purchased props", this.props.purchased);
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
