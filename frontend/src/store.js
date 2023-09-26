import { combineReducers, applyMiddleware, createStore } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailesReducer,
  productReducer,
} from "./reducers/productReducer.js";
import { ProfileReducer, userReducer } from "./reducers/userReducer.js";
import { cartReducer } from "./reducers/cartReducer.js";

const reducer = combineReducers({
  products: productReducer,
  productDetaile: productDetailesReducer,
  user: userReducer,
  profile: ProfileReducer,
  cart: cartReducer
});

const initialstate = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
