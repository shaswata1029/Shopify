import React from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions.js";
import { useAlert } from "react-alert";

import Metadata from "./layout/Metadata";
import Loader from "./layout/Loader";
import Product from "./product/Product";

function Home() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts());
  }, [dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={`Buy Best Products Online`} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Home;
