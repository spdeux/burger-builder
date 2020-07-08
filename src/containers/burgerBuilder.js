import React, { Component } from "react";
import Aux from "../hoc/aux";
import Burger from "../components/Burger/burger";
import BuildControls from "../components/Burger/BuildControls/buildControls";
import Modal from "../components/UI/Modal/modal";
import OrderSummary from "../components/Burger/OrderSummary/orderSummary";
import axios from "../axios-orders";
import Spinner from "../components/UI/Spinner/spinner";
import ErrorHandler from "../../src/hoc/errorHandler/errorHandler";

const Ingreideint_Price = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    axios.get("/ingredients.json").then((res) => {
      this.setState({ ingredients: res.data });
    });
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    const oldCount = updatedIngredients[type];
    const updatedCount = oldCount + 1;
    updatedIngredients[type] = updatedCount;

    const newPrice = this.state.totalPrice + Ingreideint_Price[type];

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    const oldCount = updatedIngredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    updatedIngredients[type] = updatedCount;

    const newPrice = this.state.totalPrice - Ingreideint_Price[type];

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  updatePurchaseState = (ingriedient) => {
    const ingredientValues = Object.values(ingriedient);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = ingredientValues.reduce(reducer);

    this.setState({ purchasable: sum > 0 });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert("do you want to continue?");
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push(`price=${this.state.totalPrice}`);
    let queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addedIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            price={this.state.totalPrice}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default ErrorHandler(BurgerBuilder, axios);
