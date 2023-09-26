import React, { Fragment } from 'react'
import './cartItem.css'
import { Link } from 'react-router-dom'

function CartItems({item}) {
  return (
    <Fragment>
        <div className="CartItemCard">
          <img src={item.image} alt="image" />
          <div>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span>{`${item.price}`}</span>
            <p>Remove</p>
          </div>
        </div>
    </Fragment>
  )
}

export default CartItems