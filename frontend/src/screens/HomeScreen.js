import Product from "../components/Product";
import { useEffect, useState } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => {
    return state.productList;
  });
  const {
    loading,
    error,
    products,
    page,
    pageNumber,
    topRated,
    latest,
  } = productList;
  useEffect(() => {
    dispatch(listProducts({ page }));
  }, [dispatch]);

  return (
    <div>
      <div className="row center">
        <strong className="category">New Arrivals</strong>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {latest.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
      <div className="row center">
        <strong className="category">Top Rated Books</strong>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {topRated.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
      <div className="row center">
        <strong className="category">Featured Books</strong>
      </div>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
      <div className="row center">
        {[...Array(pageNumber).keys()].map((x) => (
          <button
            key={x + 1}
            onClick={(e) => {
              dispatch(listProducts({ page: x + 1 }));
            }}
          >
            {x + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
