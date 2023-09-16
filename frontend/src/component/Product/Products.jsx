import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../actions/productAction'
import Loader from '../layout/loading/Loader'
import ProductCard from '../Home/ProductCard'

import './Products.css'

function Products() {

    const dispatch=useDispatch()

    const {products,loading,produtCount}=useSelector((state)=>state.products)

    useEffect(()=>{
        dispatch(getProduct())
    },[dispatch,])

  return (
   <Fragment>
    {loading?<Loader />:(
        <>
        <h2 className="productHeading">Products</h2>
        <div className="products">
            {products&& products.map((product)=>(
                <ProductCard key={product._id} product={product}/>
            ))}
        </div>
        </>
    )}
   </Fragment>
  )
}

export default Products