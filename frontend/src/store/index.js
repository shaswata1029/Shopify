import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducer from "../reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

let store;
const middleware = [thunk, logger];

export const configureStore = () => {
  store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return store;
};
