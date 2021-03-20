import Axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart = (productId, quantity) => async (
  dispatch,
  getState
) => {
  const { data } = await Axios.get(
    `http://localhost:3000/browse/book/${productId}`
  );
  console.log(data);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      title: data[0].title,
      image: data[0].image,
      price: data[0].price,
      countInStock: data[0].countInStock,
      product: data[0].id,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
