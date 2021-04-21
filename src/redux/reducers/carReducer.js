import { carAPI, inst } from "../../api/api";

const SET_CURRENT = "SET_CURRENT";
const SET_ALL = "SET_ALL";
const SET_FETCHING = "SET_FETCHING";

const initState = {
  current: null,
  all: [],
  isFetching: false
}

const carReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CURRENT:
      return { 
        ...state,
        current: {
          id: action.id,
          model: action.model,
          description: action.description,
          date: action.date,
          image: inst.defaults.baseURL + action.image
        }
      }

    case SET_ALL:
      const cars = action.cars
        .map(
          car => ({ 
            id: car.carId,
            model: car.model,
            date: car.releaseDate,
            description: car.description,
            image: inst.defaults.baseURL + car.image 
          })
        )
        .filter(car => !state.all.find(c => c.id === car.id))
      return {
        ...state,
        all: [ ...state.all, ...cars]
      }

    case SET_FETCHING:
      return { ...state, isFetching: action.isFetching }

    default:
      return state;
  }
}

const setCurrent = ({ carId, model, description, date, image }) => {
  return { type: SET_CURRENT, id: carId, model, description, date, image }
}

const setAll = (cars) => {
  return { type: SET_ALL, cars }
}

const setFetching = (isFetching) => {
  return { type: SET_FETCHING, isFetching }
}

export const requestCar = (id) => {
  return (dispatch) => {
    carAPI.get(id).then(data => {
      if (data.resultCode === 1) {
        dispatch(setCurrent(data.car));
      }
    })
  }
}

export const requestCarsBySize = (size) => {
  return (dispatch) => {
    dispatch(setFetching(true));
    carAPI.getBySize(size).then(data => {
      if (data.resultCode === 1) {
        dispatch(setAll(data.cars))
      }
      dispatch(setFetching(false));
    })
  }
}

export default carReducer;