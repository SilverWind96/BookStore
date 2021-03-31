import {
  GET_ORDER_HISTORY,
  GET_ORDER_HISTORY_DETAIL,
} from "../constants/orderConstants";

export const orderHistoryReducer = (state = { orderHistory: [] }, action) => {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return [...action.payload];
    default:
      return state;
  }
};

export const orderHistoryReducerDetail = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_HISTORY_DETAIL:
      return action.payload;
    default:
      return state;
  }
};
