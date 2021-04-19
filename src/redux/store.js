import { applyMiddleware, combineReducers, createStore } from "redux";
import authReducer from "./reducers/authReducer";
import thunk from "redux-thunk";
import appReducer from "./reducers/appReducer";
import userReducer from "./reducers/userReducer";
import formReducer from "./reducers/formReducer";

const reducers = combineReducers({
  auth: authReducer,
  app: appReducer,
  user: userReducer,
  form: formReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;