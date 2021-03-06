import { carAPI } from "../../api/api";

const SET_CARS = "SET_CARS";
const SET_FETCHING = "SET_FETCHING";
const SET_ERROR_MSG = "SET_ERROR_MSG";

const initState = {
  cars: [],
  fetching: false,
}

const searchReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CARS:
      return {
        ...state,
        cars: action.cars ? [...action.cars] : []
      }

    case SET_FETCHING:
      return { 
        ...state, 
        fetching: action.fetching 
      }

    case SET_ERROR_MSG:
      console.log(action.errorMsg)
      return {
        ...state,
        errorMsg: action.errorMsg
      }

    default:
      return state;
  }
}

export const setCars = (cars) => {
  return { type: SET_CARS, cars }
}

const setFetching = (fetching) => {
  return { type: SET_FETCHING, fetching }
}

export const searchCars = (query) => {
  return (dispatch) => {
    dispatch(setFetching(true));
    carAPI.search(query).then(data => {
      if (data.resultCode === 1) {
        dispatch(setCars(data.cars));
      } else {
        dispatch(setCars(null));
      }
      dispatch(setFetching(false));
    })
  }
}

export default searchReducer;