import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getProducts } from "../../actions/productAction";
import Loader from "../layout/loading/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import {Slider,Typography} from '@mui/material'
import "./Products.css";
import { useSearchParams } from "react-router-dom";

const categories=[
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attrie",
  "Camera",
  "SmartPhones",
  "mobile"
]

function Products() {
  const dispatch = useDispatch();

  const [CurrentPage, setCurrentPage] = useState(1);
  const [price, setprice] = useState([0,25000]);
  const [category, setcategory] = useState("");


  const { products, loading, productCount, resultPage } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHendler=(event,newprice)=>{
    setprice(newprice)
  }

  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("name");

  useEffect(() => {
    if (searchParams.get("name")) {
      dispatch(getProduct(keyword,CurrentPage,price,category));
    } else {
      dispatch(getProducts(CurrentPage,price,category));
    }
  }, [dispatch,CurrentPage, keyword,price,category, searchParams]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="productHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
              <Slider
              value={price}
              onChange={priceHendler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slide"
              min={0}
              max={25000}
              />
              <Typography>Category</Typography>
              <ul className="categoryBox">
                {categories.map((category)=>(
                  <li className="category-link" key={category} onClick={()=>setcategory(category)}>
                    {category}
                  </li>
                ))}
              </ul>
          </div>

          {resultPage < productCount && (
            <div className="paginationBox">
              <Pagination
                activePage={CurrentPage}
                itemsCountPerPage={resultPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLikActive"
              />
            </div>
          )}
        </>
      )}
    </Fragment>
  );
}

export default Products;
