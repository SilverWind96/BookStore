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
  PRODUCT_RATE_PERMISSION_SUCCESS,
} from "../constants/productConstants";

export const listProducts = ({ name = "all", genre = "", page = 1 }) => async (
  dispatch
) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  name = name === "all" ? "" : name;
  try {
    const { data } = await Axios.get(
      name && genre
        ? `http://localhost:3000/browse/book/search/${name}/${genre}/${page}`
        : name
        ? `http://localhost:3000/browse/book/search/${name}/${page}`
        : genre
        ? `http://localhost:3000/browse/book/genre/${genre}/${page}`
        : `http://localhost:3000/browse/book/page/${page}`
    );
    const data1 = await Axios.get(
      `http://localhost:3000/browse/book/top/rating/4`
    );
    data.message.topRated = data1.data.message;
    const data2 = await Axios.get(
      `http://localhost:3000/browse/book/top/date/4`
    );
    data.message.latest = data2.data.message;
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.message });
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message });
  }
};

export const detailsProduct = (productId, userInfo, page = 1) => async (
  dispatch
) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(
      `http://localhost:3000/browse/book/one/${productId}`
    );
    const data1 = await Axios.get(
      `http://localhost:3000/browse/rating/book/${productId}/${page}`
    );
    if (data.message[0].id) {
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: {
          data: data.message[0],
          data1: data1.data.message.result,
        },
      });
    } else {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: data.message[0] });
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

export const checkCanRate = (productId, userInfo) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { token } = userInfo;
    const {
      data,
    } = await Axios.get(
      `http://localhost:3000/manage/rating/permission/${productId}/${userInfo.result.username}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({
      type: PRODUCT_RATE_PERMISSION_SUCCESS,
      payload: data.message,
    });
  } catch (error) {}
};

export const detailsProductRating = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(
      `http://localhost:3000/manage/rating/book/${productId}`
    );
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

export const createBook = (
  title,
  genre,
  publishedDate,
  image,
  price,
  oldPrice,
  author,
  publisher,
  description,
  userInfo
) => async (dispatch) => {
  try {
    console.log(
      title,
      genre,
      publishedDate,
      image,
      price,
      oldPrice,
      author,
      publisher,
      description
    );
    const { token } = userInfo;
    const { data } = await Axios.post(
      `http://localhost:3000/manage/book`,
      {
        title,
        genre,
        publishedDate,
        image,
        price,
        oldPrice,
        author,
        publisher,
        description,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log(data);
  } catch (error) {
    // console.log(error);
  }
};

export const addReview = (productId, rating, content, userInfo) => async (
  dispatch
) => {
  try {
    const { data } = await Axios.post(
      `http://localhost:3000/manage/rating`,
      {
        productId: productId,
        rating: rating,
        account: userInfo.result.username,
        content: content,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
  } catch (error) {}
};
