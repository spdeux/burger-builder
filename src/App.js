import React, { Component } from "react";
import Layout from "./components/Layout/layout";
import BurgerBuilder from "./containers/burgerBuilder";
import Checkout from "./containers/Checkout/checkout";
import { Route, Switch } from "react-router-dom";
import Orders from "./containers/Checkout/Orders/orders";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
