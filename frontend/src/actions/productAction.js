import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAIES_REQUEST,
  PRODUCT_DETAIES_SUCCESS,
  PRODUCT_DETAIES_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants.js";

export const getProduct = (keyword="",currentaPage=1,price=[0,25000],category) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    let find=`/api/v1/products?name=${keyword}&page=${currentaPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`

    if(category){
    find=`/api/v1/products?name=${keyword}&page=${currentaPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
    }

    const { data } = await axios.get(find); //find gel all product in backend side

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProducts = (currentaPage=1,price=[0,25000],category) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    let find=`/api/v1/products?page=${currentaPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`

    const { data } = await axios.get(find); //find gel all product in backend side

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProducDetaile = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIES_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAIES_SUCCESS,
      payload: data.productOne,
    });
    
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
