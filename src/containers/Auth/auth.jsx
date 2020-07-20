import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/input";
import Button from "../../components/UI/Button/button";
import classes from "./auth.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/spinner";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath("/");
    }
  }

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

        if (rules.isEmail) {
          const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          isValid = pattern.test(value) && isValid;
        }
      }

      return isValid;
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };
  render() {
    const formElementsArray = [];
    for (const key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((elm) => {
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
    });

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMsg = null;
    if (this.props.error) {
      errorMsg = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMsg}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btntype="Success">SUBMIT</Button>
          <Button btntype="Danger" clicked={this.switchAuthModeHandler}>
            SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    building: state.burgerBuilder.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),

    onSetAuthRedirectPath: (path) => {
      dispatch(actions.setAuthRedirectPath(path));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
