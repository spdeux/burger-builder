import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./components/Layout/layout";
import BurgerBuilder from "./containers/burgerBuilder";
import Logout from "./containers/Auth/Logout/logout";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import * as actions from "./store/actions/index";

//lazy loading of component
const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Checkout/Orders/orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/auth");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    // TODO: it does not work
    //adding guard to router
    // let routes = (
    //   <Switch>
    //     <Route path="/auth" component={Auth} />
    //     <Route path="/" exact component={BurgerBuilder} />
    //     <Redirect to="/" />
    //   </Switch>
    // );
    // if (this.props.isAuth) {
    //   <Switch>
    //     <Route path="/checkout" component={Checkout} />
    //     <Route path="/orders" component={Orders} />
    //     <Route path="/logout" component={Logout} />
    //     <Route path="/" exact component={BurgerBuilder} />
    //     <Redirect to="/" />
    //   </Switch>;
    // }
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
