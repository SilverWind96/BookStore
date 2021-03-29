import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useEffect, useState } from "react";
import { detailsProduct } from "../actions/productActions";
import Discount from "../components/Discount";
import CurrencyFormat from "../components/CurrencyFormat";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addtoCartHandler = () => {
    props.history.push(`/cart/${productId}?quantity=${quantity}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
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
                      Description:
                      <p>{product.description}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
