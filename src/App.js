import React, { Component } from "react";
import Layout from "./components/Layout/layout";
import BurgerBuilder from "./containers/burgerBuilder";
import Checkout from "./containers/Checkout/checkout";
import { Route, Switch, withRouter } from "react-router-dom";
import Orders from "./containers/Checkout/Orders/orders";
import Auth from "./containers/Auth/auth";
import Logout from "./containers/Auth/Logout/logout";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";

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
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
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
