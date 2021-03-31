import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderHistoryReducer,
  orderHistoryReducerDetail,
} from "./reducers/orderReducers";

import {
  productDetailsReducer,
  productListReducer,
  productGenreListReducer,
} from "./reducers/productReducers";
import {
  userRegisterReducer,
  userSigninReducer,
} from "./reducers/userReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
  orderHistory: localStorage.getItem("orderHistory")
    ? JSON.parse(localStorage.getItem("orderHistory"))
    : [],
  orderHistoryDetail: {},
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productGenreList: productGenreListReducer,
  orderHistory: orderHistoryReducer,
  orderHistoryDetail: orderHistoryReducerDetail,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
