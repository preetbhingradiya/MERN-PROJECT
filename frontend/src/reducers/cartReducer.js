import { ADD_TO_CART } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
      case ADD_TO_CART:
          console.log(state);
          const item=action.payload
          const isItem=state.cartItems.find((i)=>i.product===item.product)
          if(isItem){
              return{
                  ...state,
                  cartItems:state.cartItems.map((i)=>i.product===item.product?item:i)
              }
          }
          else{
              return{
                  ...state,
                  cartItems:[...state.cartItems,item],
              }
          }

      default:
          return state
  }
};
