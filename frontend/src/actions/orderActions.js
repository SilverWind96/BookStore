import Axios from "axios";
import {
  GET_ORDER_HISTORY,
  GET_ORDER_HISTORY_DETAIL,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
} from "../constants/orderConstants";
import { getCart } from "./cartActions";
export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const { data } = await Axios.post("");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const placeOrder = (
  userInfo,
  cartArray,
  address,
  phoneNumber,
  paymentMethod,
  totalPrice
) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.post(
      "http://localhost:3000/manage/order/place",
      {
        customer: userInfo.result.username,
        items: cartArray,
        orderDate: "13/Aug/2021",
        address: address,
        phone: phoneNumber,
        payment: paymentMethod === "COD" ? 1 : 0,
        orderStatus: 0,
        totalPrice,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch(getCart(userInfo.token, userInfo.result.username));
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderHistory = (userInfo) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get(
      `http://localhost:3000/manage/order/customer/${userInfo.result.username}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    console.log(data);
    dispatch({ type: GET_ORDER_HISTORY, payload: data.message });
  } catch (error) {}
};

export const getOrderHistoryDetails = (userInfo, id) => async (
  dispatch,
  getState
) => {
  try {
    const { data } = await Axios.get(
      `http://localhost:3000/manage/order/detail/${id}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    console.log(data);
    dispatch({ type: GET_ORDER_HISTORY_DETAIL, payload: data.message });
  } catch (error) {}
};
