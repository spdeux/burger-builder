import React, { Component } from "react";
import Button from "../../../components/UI/Button/button";
import classes from "./contactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/spinner";
import { withRouter } from "react-router-dom";
import Input from "../../../components/UI/Input/input";
import { connect } from "react-redux";
import errorHandler from "../../../hoc/errorHandler/errorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      ZipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    // loading: false,
    formIsValid: false,
  };
  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (const key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };
    this.props.onOrderBurger(order);
  };

  inputChangedHandler = (event, id) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedformElement = { ...updatedOrderForm[id] };

    updatedformElement.value = event.target.value;
    updatedformElement.touched = true;
    updatedformElement.valid = this.checkValidity(
      updatedformElement.value,
      updatedformElement.validation
    );
    updatedOrderForm[id] = updatedformElement;
    let formIsValid = true;
    for (const id in updatedOrderForm) {
      formIsValid = updatedOrderForm[id].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== "" && isValid;

        if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
          isValid = value.length <= rules.maxLength && isValid;
        }
      }

      return isValid;
    }
  }
  render() {
    const formElementsArray = [];
    for (const key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form>
        {formElementsArray.map((elm) => {
          return (
            <Input
              key={elm.id}
              elementtype={elm.config.elementType}
              elementconfig={elm.config.elementConfig}
              value={elm.config.value}
              invalid={!elm.config.valid}
              shouldValidate={elm.config.validation}
              touched={elm.config.touched}
              changed={(event) => {
                this.inputChangedHandler(event, elm.id);
              }}
            />
          );
        })}
        <Button
          btntype="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => {
      dispatch(actions.purchaseBurger(orderData));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(errorHandler(ContactData, axios)));
