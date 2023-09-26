import axios from "axios";
import { ADD_TO_CART } from "../constants/cartConstants";

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
