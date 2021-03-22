import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (productId, quantity) => async (
  dispatch,
  getState
) => {
  const { data } = await Axios.get(
    `http://localhost:3000/manage/book/${productId}`
  );
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      title: data.message.title,
      image: data.message.image,
      price: data.message.price,
      countInStock: data.message.countInStock,
      product: data.message.id,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
