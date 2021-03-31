import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const addToCart = (productId, quantity, userInfo) => async (
  dispatch,
  getState
) => {
  const customer = userInfo.result.username;
  const token = userInfo.token;
  await Axios.post(
    `http://localhost:3000/manage/item`,
    {
      productId: productId,
      customer: customer,
      quantity: quantity,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const data1 = await Axios.get(
    `http://localhost:3000/manage/item/cart/${customer}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  dispatch({ type: CART_ADD_ITEM, payload: data1.data.message });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  // dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};

export const getCart = (token, customer) => async (dispatch, getState) => {
  const { data } = await Axios.get(
    `http://localhost:3000/manage/item/cart/${customer}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  dispatch({ type: CART_ADD_ITEM, payload: data.message });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const deleteItem = (userInfo, itemId) => async (dispatch, getState) => {
  await Axios.delete(`http://localhost:3000/manage/item/${itemId}`, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  });
  const data1 = await Axios.get(
    `http://localhost:3000/manage/item/cart/${userInfo.result.username}`,
    {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
  );
  dispatch({ type: CART_ADD_ITEM, payload: data1.data.message });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const updateItem = (userInfo, itemId, productId, quantity) => async (
  dispatch,
  getState
) => {
  await Axios.put(
    `http://localhost:3000/manage/item`,
    {
      id: itemId,
      productId: productId,
      customer: userInfo.result.username,
      quantity: quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );
  const data1 = await Axios.get(
    `http://localhost:3000/manage/item/cart/${userInfo.result.username}`,
    {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
  );
  dispatch({ type: CART_ADD_ITEM, payload: data1.data.message });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
