import React, { Component } from "react";
import Aux from "../hoc/aux";
import Burger from "../components/Burger/burger";
import BuildControls from "../components/Burger/BuildControls/buildControls";
import Modal from "../components/UI/Modal/modal";
import OrderSummary from "../components/Burger/OrderSummary/orderSummary";
import axios from "../axios-orders";
import Spinner from "../components/UI/Spinner/spinner";
import ErrorHandler from "../../src/hoc/errorHandler/errorHandler";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = (ingriedient) => {
    const ingredientValues = Object.values(ingriedient);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = ingredientValues.reduce(reducer);
    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchased();
    this.props.history.push("/checkout");
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
            isAuth={this.props.isAuth}
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
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientsAdded: (name) => {
      dispatch(actions.addIngredient(name));
    },
    onIngredientsRemoved: (name) => {
      dispatch(actions.removeIngredient(name));
    },
    onInitIngredients: () => {
      dispatch(actions.initIngredients());
    },
    onInitPurchased: () => {
      dispatch(actions.purchaseInit());
    },
    onSetAuthRedirectPath: (path) => {
      dispatch(actions.setAuthRedirectPath(path));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ErrorHandler(BurgerBuilder, axios)));
