import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";

export default function SearchScreen(props) {
  const { name = "all", genre = "all" } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productGenreList = useSelector((state) => state.productGenreList);
  const {
    loading: loadingGenres,
    error: errorGenres,
    genres,
  } = productGenreList;

  useEffect(() => {
    dispatch(
      listProducts({
        name: name !== "all" ? name : "",
        genre: genre !== "all" ? genre : "",
      })
    );
  }, [genre, dispatch, name]);

  const getFilterUrl = (filter) => {
    const filterGenre = filter.genre || genre;
    const filterName = filter.name ? filter.name : name !== "all" ? name : "";
    return `/search/genre/${filterGenre}/name/${filterName}`;
  };

  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>
          {loadingGenres ? (
            <LoadingBox></LoadingBox>
          ) : errorGenres ? (
            <MessageBox variant="danger">{errorGenres}</MessageBox>
          ) : (
            <ul>
              {genres.map((g) => (
                <li key={g}>
                  <Link
                    className={g === genre ? "active" : ""}
                    to={getFilterUrl({ genre: g })}
                  >
                    {g}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product.id} product={product}></Product>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
