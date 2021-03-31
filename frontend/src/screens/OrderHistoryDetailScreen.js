import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import CurrencyFormat from "..//components/CurrencyFormat";
import { getOrderHistoryDetails, placeOrder } from "../actions/orderActions";

const PlaceOrderScreen = (props) => {
  const orderHistoryDetail = useSelector((state) => state.orderHistoryDetail);
  const { items } = orderHistoryDetail;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  if (!userInfo) {
    props.history.push("/signin");
  }
  const orderId = props.match.params.id;
  useEffect(() => {
    dispatch(getOrderHistoryDetails(userInfo, orderId));
  }, [dispatch, userInfo, orderId]);
  return (
    <div>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {userInfo.result.fullName}
                  <br />
                  <strong>Address:</strong> {orderHistoryDetail.address}
                  <br />
                  <strong>Phone number:</strong> {orderHistoryDetail.phone}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong>{" "}
                  {orderHistoryDetail.payment === 1 ? "COD" : "PayPal"}
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
                      {items
                        ? items.map((item) => (
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
                                  <Link to={`/product/${item.productId}`}>
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
                          ))
                        : ""}
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
                    <CurrencyFormat number={orderHistoryDetail.totalPrice} />
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
                      <CurrencyFormat number={orderHistoryDetail.totalPrice} />
                    </strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="card card-body">
            <div className="row">
              <div>
                <strong> Order Status:</strong>
              </div>
              <div>
                <strong>
                  {orderHistoryDetail.orderStatus === 1
                    ? "Delivered"
                    : "Shipping"}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
