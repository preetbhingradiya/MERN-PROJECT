import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./product.css";
import { useDispatch, useSelector } from "react-redux";
import { getproductDetails } from "../../actions/productAction";

const ProductDetails = () => {
  const dispatch = useDispatch();

  const { product,loading ,eror } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    dispatch(getproductDetails());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="productDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="curouselImg"
                  key={item.img}
                  src={item.img}
                  alt={`${i} slide`}
                />
              ))}
          </Carousel>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
