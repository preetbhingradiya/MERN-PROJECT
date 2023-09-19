import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getProducts } from "../../actions/productAction";
import Loader from "../layout/loading/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import {Slider,Typography} from '@mui/material'
import "./Products.css";
import { useSearchParams } from "react-router-dom";

function Products() {
  const dispatch = useDispatch();

  const [CurrentPage, setCurrentPage] = useState(1);
  const [price, setprice] = useState([0,25000]);

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
      dispatch(getProduct(keyword,CurrentPage,price));
    } else {
      dispatch(getProducts(CurrentPage,price));
    }
  }, [dispatch,CurrentPage, keyword,price, searchParams]);

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
            <Typography>
              <Slider
              value={price}
              onChange={priceHendler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slide"
              min={0}
              max={25000}
              />
            </Typography>
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
