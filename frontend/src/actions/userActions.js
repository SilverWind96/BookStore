import Axios from "axios";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants/userConstants";

export const signin = (username, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } });
  try {
    const { data } = await Axios.post(
      "http://localhost:3000/manage/account/login",
      {
        username,
        password,
      }
    );
    if (data.message.username) {
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.message });
      localStorage.setItem("userInfo", JSON.stringify(data.message));
    } else {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  dispatch({ type: USER_SIGNOUT });
};
