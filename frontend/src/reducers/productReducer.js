import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAIES_REQUEST,
  PRODUCT_DETAIES_SUCCESS,
  PRODUCT_DETAIES_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants.js";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        product: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.show,
        productCount: action.payload.productCount,
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailesReducer=(state={product:{}},action)=>{
  switch (action.type) {
    case  PRODUCT_DETAIES_REQUEST:
      return{
        loading:true,
        ...state
      };
    case PRODUCT_DETAIES_SUCCESS:
      return{
        loading:false,
        product:action.payload
      };
    case PRODUCT_DETAIES_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
    case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
      return state;
  }
}
