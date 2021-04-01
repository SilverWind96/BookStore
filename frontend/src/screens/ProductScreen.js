import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useEffect, useState } from "react";
import {
  addReview,
  checkCanRate,
  detailsProduct,
} from "../actions/productActions";
import Discount from "../components/Discount";
import CurrencyFormat from "../components/CurrencyFormat";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading,
    error,
    product,
    rating,
    ratingPermission,
    page,
    pageNumber,
  } = productDetails;
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  // const [description, setdescription] = useState("");
  const [descriptionStatus, setdescriptionStatus] = useState(true);
  const [ratingPoint, setRatingPoint] = useState(0);
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    dispatch(detailsProduct(productId));
    if (userInfo) {
      dispatch(checkCanRate(productId, userInfo));
    }
  }, [dispatch, productId, userInfo, submit]);

  const addtoCartHandler = () => {
    props.history.push(`/cart/${productId}?quantity=${quantity}`);
  };
  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(addReview(productId, ratingPoint, comment, userInfo));
    setSubmit(!submit);
    setComment("");
    setRatingPoint(0);
  };
  const submitHandler = (e) => {};
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : product ? (
        <div>
          <div className="row top">
            <div className="col-2">
              <img className="large" src={product.image} alt={product.title} />
            </div>

            <div className="col-2">
              <div className="card card-body">
                <ul>
                  <li>
                    <h1>{product.title}</h1>
                  </li>
                  <li>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    />
                  </li>
                  <li>
                    <div className="row">
                      <div>Author</div>
                      <div>{product.author}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">
                        <CurrencyFormat number={product.price} />{" "}
                        <span className="old-price">
                          <CurrencyFormat number={product.oldPrice} />
                        </span>
                        <Discount
                          oldPrice={product.oldPrice}
                          price={product.price}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Quantity</div>
                          <div>
                            <select
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addtoCartHandler}
                          className="primary block"
                        >
                          Add to cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="card card-body">
                <div className="col-1">
                  <ul>
                    <li>
                      <strong>Description</strong>
                      <div className="des">
                        <pre>
                          {descriptionStatus
                            ? product.description.slice(0, 400) + "..."
                            : product.description}
                        </pre>
                        <div className="row center">
                          <button
                            className="btn-show"
                            onClick={(e) => {
                              setdescriptionStatus(!descriptionStatus);
                            }}
                          >
                            {descriptionStatus ? "Show More" : "Show Less"}
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {ratingPermission ? (
                <div className="">
                  <form
                    className="form reviews card card-body"
                    onSubmit={submitHandler}
                  >
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <div className="rating1">
                        <span>
                          <i
                            onClick={(e) => setRatingPoint(1)}
                            className={
                              ratingPoint > 0.5
                                ? "fas fa-star star"
                                : ratingPoint > 0
                                ? "fas fa-star-half-alt star"
                                : "far fa-star star"
                            }
                          ></i>
                        </span>
                        <span>
                          <i
                            onClick={(e) => setRatingPoint(2)}
                            className={
                              ratingPoint > 1.5
                                ? "fas fa-star star"
                                : ratingPoint > 1
                                ? "fas fa-star-half-alt star"
                                : "far fa-star star"
                            }
                          ></i>
                        </span>
                        <span>
                          <i
                            onClick={(e) => setRatingPoint(3)}
                            className={
                              ratingPoint > 2.5
                                ? "fas fa-star star"
                                : ratingPoint > 2
                                ? "fas fa-star-half-alt star"
                                : "far fa-star star"
                            }
                          ></i>
                        </span>
                        <span>
                          <i
                            onClick={(e) => setRatingPoint(4)}
                            className={
                              ratingPoint > 3.5
                                ? "fas fa-star star"
                                : ratingPoint > 3
                                ? "fas fa-star-half-alt star"
                                : "far fa-star star"
                            }
                          ></i>
                        </span>
                        <span>
                          <i
                            onClick={(e) => setRatingPoint(5)}
                            className={
                              ratingPoint > 4.5
                                ? "fas fa-star star"
                                : ratingPoint > 4
                                ? "fas fa-star-half-alt star"
                                : "far fa-star star"
                            }
                          ></i>
                        </span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button
                        className="primary block"
                        type="submit"
                        onClick={(e) => submitReviewHandler(e)}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="card card-body">
            <strong>Reviews ({rating ? rating.length : 0})</strong>

            {rating
              ? rating.map((item) => (
                  <div className="reviews" key={item.id}>
                    <strong>{item.account}</strong>
                    <span>
                      <div className="rating1">
                        <span>
                          <i
                            className={
                              item.rating > 0.5
                                ? "fas fa-star"
                                : item.rating > 0
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          ></i>
                        </span>
                        <span>
                          <i
                            className={
                              item.rating > 1.5
                                ? "fas fa-star"
                                : item.rating > 1
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          ></i>
                        </span>
                        <span>
                          <i
                            className={
                              item.rating > 2.5
                                ? "fas fa-star"
                                : item.rating > 2
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          ></i>
                        </span>
                        <span>
                          <i
                            className={
                              item.rating > 3.5
                                ? "fas fa-star"
                                : item.rating > 3
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          ></i>
                        </span>
                        <span>
                          <i
                            className={
                              item.rating > 4.5
                                ? "fas fa-star"
                                : item.rating > 4
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          ></i>
                        </span>
                      </div>
                    </span>
                    <p>{item.content}</p>
                  </div>
                ))
              : ""}
            <div className="row center">
              {pageNumber > 1
                ? [...Array(pageNumber).keys()].map((x) => (
                    <button
                      key={x + 1}
                      onClick={(e) => {
                        dispatch(detailsProduct(productId, page));
                      }}
                    >
                      {x + 1}
                    </button>
                  ))
                : ""}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
