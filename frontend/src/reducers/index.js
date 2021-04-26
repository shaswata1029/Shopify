import { combineReducers } from "redux";
import { productsReducer, productDetailsReducer } from "./product";

export default combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
});
