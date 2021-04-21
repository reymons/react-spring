import { carAPI, inst } from "../../api/api";

const SET_CURRENT = "SET_CURRENT";
const SET_ALL = "SET_ALL";

const initState = {
  current: null,
  all: []
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
              ...car,
              id: car.carId, 
              image: inst.defaults.baseURL + car.image 
            })
          )
          .filter(car => !state.all.find(c => c.id === car.id))

        return {
          ...state,
          all: [
            ...state.all,
            ...cars,
          ]
        }

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

export const requestCar = (id) => {
  return (dispatch) => {
    carAPI.get(id).then(data => {
      if (data.resultCode === 1) {
        dispatch(setCurrent(data.car))
      }
    })
  }
}

export const requestCarsBySize = (size) => {
  return (dispatch) => {
    carAPI.getBySize(size).then(data => {
      if (data.resultCode === 1) {
        dispatch(setAll(data.cars))
      }
    })
  }
}

export default carReducer;