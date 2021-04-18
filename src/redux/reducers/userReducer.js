import { authAPI } from "../../api/api";

const SET_USER_INFO = "SET_USER_INFO";

const initState = { 
  id: null, 
  name: null, 
  surnam: null, 
  phoneNumber: null, 
  email: null, 
  sex: null
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        id: action.id,
        name: action.name,
        surname: action.surname,
        phoneNumber: action.phoneNumber,
        email: action.email,
        sex: action.sex
      }
    default:
      return state;
  }
}

const initUser = ({ id, name, surname, phoneNumber, email, sex }) => {
  return { type: SET_USER_INFO, id, name, surname, phoneNumber, email, sex }
}

export const registerUser = ({ login, name, surname, password, phoneNumber, email, sex }) => {
  return (dispatch) => {
    dispatch(authAPI.register())
      .then(data => {
        if (data.message === "Registered") {
          dispatch(initUser(data));
        }
      })
  }
}

export default userReducer;