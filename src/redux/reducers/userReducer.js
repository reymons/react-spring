const SET_USER_INFO = "SET_USER_INFO";

const initState = { 
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

// const setUserInfo = ({ name, surname, phoneNumber, email, sex }) => {
//   return { type: SET_USER_INFO, name, surname, phoneNumber, email, sex }
// }

export default userReducer;