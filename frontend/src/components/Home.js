import React from "react";
import Metadata from "./layout/Metadata";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions.js";

import Loader from "./layout/Loader";
import Product from "./product/Product";

function Home() {
  const dispatch = useDispatch();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
