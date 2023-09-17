import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Helment from "../layout/MetaData";
import { getProduct} from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loading/Loader";
import ProductCard from "./ProductCard";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, error, products} = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
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
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
