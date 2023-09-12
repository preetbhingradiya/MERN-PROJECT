import React, { Fragment, useEffect } from "react";
import {CgMouse} from 'react-icons/cg'
import './Home.css'
import Product from './Product.jsx'
import Helment from "../layout/MetaData";
import {getProduct} from '../../actions/productAction'
import {useSelector,useDispatch} from "react-redux"

const product={
  name:"T-shirt",
  img:[{url:'https://media.istockphoto.com/id/488160041/photo/mens-shirt.jpg?s=612x612&w=0&k=20&c=xVZjKAUJecIpYc_fKRz_EB8HuRmXCOOPOtZ-ST6eFvQ='}],
  price:"3000",
  _id:"preet"
}

const Home = () => {

  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getProduct())
  },[dispatch])

  return (
    <Fragment>

      <Helment title={"Ecommerce"} />
      
      <div className="banner">
        <p>Welcome to ecommerce</p>
        <h1>FIND AMAZING PRODUCT BELOW</h1>

        <a href="#container">
          <button>
            scroll <CgMouse />
            </button>
        </a>
      </div>

      <h2 className="Homeheading">Featured Product</h2>

      <div id="container" className="container">
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
      </div>
    </Fragment>
  );
};

export default Home;
