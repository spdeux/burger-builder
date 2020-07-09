import React, { Component } from "react";
import Aux from "../hoc/aux";
import Burger from "../components/Burger/burger";
import BuildControls from "../components/Burger/BuildControls/buildControls";
import Modal from "../components/UI/Modal/modal";
import OrderSummary from "../components/Burger/OrderSummary/orderSummary";
import axios from "../axios-orders";
import Spinner from "../components/UI/Spinner/spinner";
import ErrorHandler from "../../src/hoc/errorHandler/errorHandler";
import * as actionType from "../store/action";
import { connect } from "react-redux";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  updatePurchaseState = (ingriedient) => {
    const ingredientValues = Object.values(ingriedient);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = ingredientValues.reduce(reducer);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");

    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push(`price=${this.state.totalPrice}`);
    // let queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString,
    // });
  };

  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = <Spinner />;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addedIngredient={this.props.onIngredientsAdded}
            removeIngredient={this.props.onIngredientsRemoved}
            price={this.props.price}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
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

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientsAdded: (name) => {
      dispatch({ type: actionType.ADD_INGREDIENT, name: name });
    },
    onIngredientsRemoved: (name) => {
      dispatch({ type: actionType.REMOVE_INGREDIENT, name: name });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(BurgerBuilder, axios));
