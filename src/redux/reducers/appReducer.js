import { getAuthInfo } from "./authReducer";

const INIT_APP = "INIT_APP";

const initState = {
  initialized: false
}

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case INIT_APP:
      return { ...state, initialized: true }
    default:
      return state;
  }
}

const initApp = () => ({ type: INIT_APP })

export const initializeApp = () => (dispatch) => {
  dispatch(getAuthInfo()).then(() => dispatch(initApp()))
}

export default appReducer;