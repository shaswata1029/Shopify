import React from "react";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions.js";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";

import Metadata from "./layout/Metadata";
import Loader from "./layout/Loader";
import Product from "./product/Product";

function Home({ match }) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentpage] = useState(1);

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const keyword = match.params.keyword;
  console.log(sessionStorage.getItem("prevSearch"));
  console.log(keyword);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    if (sessionStorage.getItem("prevSearch") !== keyword && keyword != null)
      setCurrentpage(1);
    dispatch(getProducts(keyword, currentPage));
    sessionStorage.setItem("prevSearch", keyword);
  }, [dispatch, alert, error, currentPage, keyword]);

  function setCurrentPageNo(pageNumber) {
    setCurrentpage(pageNumber);
  }

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

          {resPerPage < productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Home;
