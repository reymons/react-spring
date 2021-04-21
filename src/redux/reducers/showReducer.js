import { showAPI } from "../../api/api";

const SET_ORDER = "SET_ORDER";
const SET_FETCHING = "SET_FETCHING";

const initState = {
  orders: [],
  fetching: false,
  fetched: true
}

const showReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_FETCHING:
      return { 
        ...state, 
        fetching: action.fetching,
        fetched: false 
      }

    case SET_ORDER:
      return {
        ...state,
        orders: [ ...state.orders, action.order ],
        fetched: true
      }

    default:
      return state;
  }
}

const setFetching = (fetching) => {
  return { type: SET_FETCHING, fetching }
}

const setOrder = (order) => {
  return { type: SET_ORDER, order }
}

export const makeOrder = (carId, userId, date) => {
  return (dispatch) => {
    dispatch(setFetching(true));
    showAPI.order(carId, userId, date)
      .then(data => {
        if (data.resultCode === 1) {
          dispatch(setOrder({ carId, date }));
        }
        dispatch(setFetching(false));
      })
  }
}

export default showReducer;