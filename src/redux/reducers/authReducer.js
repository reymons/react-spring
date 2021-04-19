import { authAPI } from "../../api/api";
import { initApp } from "../reducers/appReducer";
import { toggleAuthForm, toggleFetching } from "./formReducer";

const SET_AUTH_INFO = "SET_AUTH_INFO";

const initState = {
  userId: null,
  login: null,
  isAuth: false
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_AUTH_INFO:
      return { 
        ...state, 
        userId: action.userId, 
        login: action.login, 
        isAuth: action.isAuth
      }
    default:
      return state;
  }
}

const setAuthInfo = (userId, login, isAuth) => ({ type: SET_AUTH_INFO, userId, login, isAuth })

export const getAuthInfo = () => (dispatch) => {
  return authAPI.me().then(data => {
    if (data && data.message === "Authorized") {
      dispatch(setAuthInfo(data.userId, data.login, true))
    } else {
      dispatch(initApp());
    }
  })
}

export const registerUser = (registerData) => {
  return (dispatch) => {
    dispatch(toggleFetching(true));
    authAPI.register(registerData).then(data => {
      if (data.message === "Registered") {
        Promise.resolve(dispatch(getAuthInfo()))
          .then(() => {
            dispatch(toggleAuthForm(false));
            dispatch(toggleFetching(false));
          })
      }
    })
  }
}

export const logIn = (loginData) => {
  return (dispatch) => {
    dispatch(toggleFetching(true));
    authAPI.logIn(loginData).then(data => {
      if (data.message === "Logged in") {
        Promise.resolve(dispatch(getAuthInfo()))
          .then(() => {
            dispatch(toggleAuthForm(false));
            dispatch(toggleFetching(false));
          })
      }
    })
  }
}

export const logOut = () => {
  return (dispatch) => {
    authAPI.logOut().then(data => {
      if (data.message === "Logged out") {
        dispatch(setAuthInfo(null, null, false));
      }
    })
  }
}

export default authReducer;