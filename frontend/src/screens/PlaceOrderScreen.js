import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import CurrencyFormat from "..//components/CurrencyFormat";
import { placeOrder } from "../actions/orderActions";

const PlaceOrderScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const cartArray = cartItems.map((item) => item.id);
  cart.itemsPrice = cart.cartItems.reduce(
    (a, c) => a + c.quantity * c.price,
    0
  );
  cart.totalPrice = cart.itemsPrice;

  const placeOrderHandler = () => {
    dispatch(
      placeOrder(
        userInfo,
        cartArray,
        shippingAddress.address,
        shippingAddress.phoneNumber,
        paymentMethod,
        cart.totalPrice
      )
    );
    props.history.push("/orderHistory");
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
                        <tr key={item.id}>
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
                  <div>
                    <strong> Total</strong>
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
