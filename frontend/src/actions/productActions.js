import Axios from "axios";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_GENRE_LIST_FAIL,
  PRODUCT_GENRE_LIST_REQUEST,
  PRODUCT_GENRE_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const listProducts = ({ name = "", genre = "" }) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      name && genre
        ? `http://localhost:3000/browse/book/search/${name}/${genre}`
        : name
        ? `http://localhost:3000/browse/book/search/${name}`
        : genre
        ? `http://localhost:3000/browse/book/search/genre/${genre}`
        : `http://localhost:3000/browse/book`
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.message });
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(
      `http://localhost:3000/browse/book/${productId}`
    );
    if (data.message.id) {
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.message });
    } else {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: data.message });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductGenres = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_GENRE_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`http://localhost:3000/browse/book/genre`);
    dispatch({ type: PRODUCT_GENRE_LIST_SUCCESS, payload: data.message.genre });
  } catch (error) {
    dispatch({ type: PRODUCT_GENRE_LIST_FAIL, payload: error.message });
  }
};
