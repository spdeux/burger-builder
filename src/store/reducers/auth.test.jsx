import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

const intialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(intialState);
  });

  it("should store token upon login", () => {
    expect(
      reducer(intialState, {
        type: actionTypes.AUTH_SUCCESS,
        idToken: "some-token",
        userId: "some=userId",
      })
    ).toEqual({
      token: "some-token",
      userId: "some=userId",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
