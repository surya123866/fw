import { combineReducers } from "redux";
import registrationReducer from "./reducer";

const rootReducer = combineReducers({
  registrationReducer,
});

export default rootReducer;
