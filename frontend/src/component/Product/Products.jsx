import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../layout/loading/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";

import "./Products.css";
import { useSearchParams } from "react-router-dom";

function Products() {
  const dispatch = useDispatch();

  const [CurrentPage, setCurrentPage] = useState(1);

  const { products, loading, productCount, resultPage } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  console.log(CurrentPage);

  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("name");

  useEffect(() => {
    if (searchParams.get("name")) {
      dispatch(getProduct(keyword));
    } else {
      dispatch(getProduct());
    }
  }, [dispatch, keyword, searchParams]);

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
