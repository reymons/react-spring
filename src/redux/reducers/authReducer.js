import { authAPI } from "../../api/api";

const SET_AUTH_INFO = "SET_AUTH_INFO";

const initState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_AUTH_INFO:
      return { 
        ...state, 
        userId: action.userId, 
        login: action.login, 
        isAuth: true 
      }
    default:
      return state;
  }
}

const setAuthInfo = (userId, login) => ({ type: SET_AUTH_INFO, userId, login })

export const getAuthInfo = () => (dispatch) => {
  return authAPI.me().then(data => {
    if (data.message === "Authorized") {
      dispatch(setAuthInfo(data.userId, data.login))
    }
  })
}

export default authReducer;