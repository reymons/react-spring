import { applyMiddleware, combineReducers, createStore } from "redux";
import authReducer from "./reducers/authReducer";
import thunk from "redux-thunk";
import appReducer from "./reducers/appReducer";

const reducers = combineReducers({
  auth: authReducer,
  app: appReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;