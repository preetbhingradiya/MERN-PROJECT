import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {useParams} from 'react-router-dom'
import { getproductDetails } from "../../actions/productAction.js";

const ProductDetails = ({}) => {
  const {id}=useParams()

  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) =>state.productDetails
  );

  useEffect(() => {
    dispatch(getproductDetails(id));
  }, [dispatch, id]);

  console.log(product);

  return (
    <Fragment>
      <div className="ProductDetails">
        <div>
          <Carousel>
          </Carousel>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
