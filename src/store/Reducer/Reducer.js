import * as actions from "../Actions/actions";

const initialState = {
  AuthState: false,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actions.AUTH_SUCCESS:
      return {
        ...state,
        AuthState: true,
        user: action.user,
      };
    case actions.AUTH_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case actions.AUTH_SIGNOUT:
      return {
        AuthState: false,
        user: null
      };
    default:
      return state;
  }
};

export default reducer;
