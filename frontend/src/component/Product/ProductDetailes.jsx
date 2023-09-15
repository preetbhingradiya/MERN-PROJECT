import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducDetaile } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./productdetaile.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/loading/Loader.jsx";

function ProductDetailes({}) {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { product, loading, eror } = useSelector(
    (state) => state.productDetaile
  );

  useEffect(() => {
    dispatch(getProducDetaile(id));
  }, [dispatch, id]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="productDetail">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      src={item.img}
                      alt={`${i} Slide`}
                      key={item.img}
                      className="img"
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detaile-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className="detaile-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} reviwes)</span>
              </div>

              <div className="detaile-3">
                <h1>{`${product.price}`}</h1>
                <div className="detaile-3-1">
                  <div className="detaile-3-1-1">
                    <button>-</button>
                    <input type="number" value="1" />
                    <button>+</button>
                  </div>
                  <button>Add To Cart</button>
                </div>

                <p>
                  status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detaile-4">
                Description :- <p>{product.description}</p>
              </div>

              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIWS</h3>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviwes Yet</p>
          )}
        </>
      )}
    </Fragment>
  );
}

export default ProductDetailes;
