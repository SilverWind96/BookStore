import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingAddressScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [address, setAddress] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const phoneno = /^\d{10}$/;
    if (phoneNumber.match(phoneno)) {
      dispatch(
        saveShippingAddress({
          address,
          phoneNumber,
        })
      );
      props.history.push("/payment");
    } else {
      alert("Please insert a valid phone number");
    }
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="number"
            id="phone"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressScreen;
