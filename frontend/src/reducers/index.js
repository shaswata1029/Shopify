import { combineReducers } from "redux";
import { productsReducer, productDetailsReducer } from "./product";

import { authReducer } from "./auth";

export default combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
});
