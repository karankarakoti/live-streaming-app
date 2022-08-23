import { authConstants } from "redux/constants";

const initState = {
  token: null,
  user: null,
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
}

export default (state = initState, action) => {  
  switch(action.type){
    case authConstants.LOGIN_REQUEST:
      state={
        ...state,
        loading: true,
        authenticating: true,
      }
      break;

    case authConstants.LOGIN_SUCCESS:
      state={
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        loading: false
      }
      break;

    case authConstants.LOGIN_FAILURE:
      state={
        ...state,
        authenticating: false,
        error: action.payload.error,
        loading: false
      }
      break;

    case authConstants.LOGOUT_REQUEST:
      state={
        ...state,
        loading: false
      }
      break;

    case authConstants.LOGOUT_SUCCESS:
      state={
        ...initState
      }
      break;

    case authConstants.LOGOUT_FAILURE:
      state={
        ...state,
        error: action.payload?.error ? action.payload.error : "Something Went Wrong",
        loading: false
      }
      break;

    case authConstants.SIGNUP_REQUEST:
      state={
        ...state,
        loading: true
      }
      break;

    case authConstants.SIGNUP_SUCCESS:
      state={
        ...state,
        message: action.payload.message,
        loading: false
      }
      break;

    case authConstants.SIGNUP_FAILURE:
      state={
        ...state,
        loading: false,
        error: action.payload?.error ? action.payload.error : "Something Went Wrong"
      }
      break;
  }
  return state;
}