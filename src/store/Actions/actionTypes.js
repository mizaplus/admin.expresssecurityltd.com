//Importing actions
import { Auth } from "aws-amplify";
import * as actions from "./actions";

export const setUser = (user) => {
  return {
    type: actions.SET_USER,
    user,
  };
};

export const AuthSuccess = (user) => {
  return {
    type: actions.AUTH_SUCCESS,
    user,
  };
};

export const AuthFailure = (error) => {
  return {
    type: actions.AUTH_FAILURE,
    error,
  };
};

export const AuthSignOut = () => {
  return {
    type: actions.AUTH_SIGNOUT,
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    Auth.signOut()
      .then(() => {
        dispatch(AuthSignOut());
      })
      .catch((err) => console.log(err));
  };
};
