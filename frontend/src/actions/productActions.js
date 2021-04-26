import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

import axios from "axios";

export const getProducts = (keyword = "", currentPage = 1) => async (
  dispatch
) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });

    console.log(
      `http://localhost:8000/api/v1/product?keyword=${keyword}&page=${currentPage}`
    );
    console.log();
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/product?keyword=${keyword}&page=${currentPage}`
    );

    dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ALL_PRODUCTS_FAIL, payload: error.response.data.message });
  }
};

// Get product details

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:8000/api/v1/product/${id}`
    );

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
