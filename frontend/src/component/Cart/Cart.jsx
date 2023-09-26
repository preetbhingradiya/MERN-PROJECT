import React, { Fragment } from "react";
import "./Cart.css";
import CartItems from "./CartItems.jsx";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../../actions/cartAction";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const deleteItems=(id)=>{
    dispatch(removeItemFromCart(id))
  }

  console.log(cartItems);
  return (
    <Fragment>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>SubTotal</p>
        </div>

        {cartItems &&
          cartItems.map((item) => (
            <div className="cartContainer">
              <CartItems item={item} remove={deleteItems} />
              <div className="cartInput">
                <input type="number" readOnly value={item.quntity} />
              </div>
              <p className="cartSubtotal">{item.price * item.quntity}</p>
            </div>
          ))}

        <div className="cartGrossProfit">
          <div></div>
          <div className="cartGrossProfitBox">
            <p>Gross Total</p>
            <p>{600}</p>
          </div>
          <div></div>
          <div className="checkOutBtn">
            <button>Check Out</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
