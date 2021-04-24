import { showAPI } from "../../api/api";

const SET_ORDER = "SET_ORDER";
const SET_FETCHING = "SET_FETCHING";
const SET_FETCHED = "SET_FETCHED";

const initState = {
  orders: [],
  fetching: false,
  fetched: false
}

const showReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_FETCHING:
      return { 
        ...state, 
        fetching: action.fetching,
      }

    case SET_ORDER:
      return {
        ...state,
        orders: [ ...state.orders, action.order ],
      }

    case SET_FETCHED:
      return { 
        ...state, 
        fetched: action.fetched 
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

const setFetched = (fetched) => {
  return { type: SET_FETCHED, fetched }
}

export const makeOrder = (carId, userId, date) => {
  return (dispatch) => {
    dispatch(setFetching(true));
    showAPI.order(carId, userId, date)
      .then(data => {
        if (data.resultCode === 1) {
          Promise.all(
            [
              dispatch(setOrder({ carId, date })), 
              dispatch(setFetched(true))
            ]
          ).then(() => {
            setTimeout(() => dispatch(setFetched(false)), 5000) 
          })
        }
        dispatch(setFetching(false));
      })
  }
}

export default showReducer;