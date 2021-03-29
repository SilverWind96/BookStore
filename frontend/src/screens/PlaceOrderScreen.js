import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import CurrencyFormat from "..//components/CurrencyFormat";
// import { addToCart } from "../actions/cartActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  //   const { loading, success, error, order } = orderCreate;
  cart.itemsPrice = cart.cartItems.reduce(
    (a, c) => a + c.quantity * c.price,
    0
  );
  cart.shippingPrice = 40000;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName}
                  <br />
                  <strong>Address:</strong> {cart.shippingAddress.address}
                  <br />
                  <strong>Phone number:</strong>{" "}
                  {cart.shippingAddress.phoneNumber}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  <table>
                    <thead>
                      <tr>
                        <td>Image</td>
                        <td>Name</td>
                        <td>Quantity</td>
                        <td>Price</td>
                        <td>Total Price</td>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.cartItems.map((item) => (
                        <tr key={item.product}>
                          <td>
                            <div>
                              <img
                                src={item.image}
                                alt={item.title}
                                className="small"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="min-30">
                              <Link to={`/product/${item.product}`}>
                                {item.title}
                              </Link>
                            </div>
                          </td>
                          <td>{item.quantity}x</td>
                          <td>
                            <div>
                              <CurrencyFormat number={item.price} />
                            </div>
                          </td>
                          <td>
                            <CurrencyFormat
                              number={item.price * item.quantity}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>
                    <CurrencyFormat number={cart.itemsPrice} />
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>
                    <CurrencyFormat number={cart.shippingPrice} />
                  </div>
                </div>
              </li>
              {/* <li>
                <div className="row">
                  <div>Tax</div>
                  <div>
                    <CurrencyFormat number={cart.taxPrice} />
                  </div>
                </div>
              </li> */}
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>
                      <CurrencyFormat number={cart.totalPrice} />
                    </strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {/* {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
