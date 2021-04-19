const TOGGLE_AUTH_FORM = "OPEN_AUTH_FORM";
const TOGGLE_FETCHING = "TOGGLE_FETCHING";

const initState = {
  isAuthForm: false,
  isFetching: false
}

const formReducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_AUTH_FORM:
      return {
        ...state,
        isAuthForm: action.isAuthForm
      }
    case TOGGLE_FETCHING: 
      return {
        ...state,
        isFetching: action.isFetching
      }
    default:
      return state;
  }
}

export const toggleAuthForm = (isAuthForm) => ({ type: TOGGLE_AUTH_FORM, isAuthForm })

export const toggleFetching = (isFetching) => ({ type: TOGGLE_FETCHING, isFetching })

export default formReducer;