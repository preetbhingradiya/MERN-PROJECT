import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants/cartConstants";

//ADD TO CARD
export const addToCart = (id, quntity) => async (dispatch,getSate) => {
  const { data } = await axios.get(`/api/v1/product/${id}`)

  dispatch({
    type: ADD_TO_CART,
    payload: {
        product: data.productOne._id,
        name: data.productOne.name,
        price: data.productOne.price,
        image: data.productOne.images[0].img,
        stock: data.productOne.stock,
        quntity,
    },
  });
  alert("Item Can Add To Card")

  localStorage.setItem("cartItems",JSON.stringify(getSate().cart.cartItems))
};


export const removeItemFromCart = (id) => async (dispatch,getSate) => {

  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id
  });
  
  localStorage.setItem("cartItems",JSON.stringify(getSate().cart.cartItems))
};
