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

export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.result,
        page: action.payload.page,
        pageNumber: action.payload.pageNumber,
        topRated: action.payload.topRated,
        latest: action.payload.latest,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: {}, rating: [], loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload.data,
        rating: action.payload.data1.result,
        pageNumber: action.payload.data1.pageNumber,
        page: action.payload.data1.page,
        // ratingPermission: action.payload.data2 === true ? true : false,
      };
    case PRODUCT_RATE_PERMISSION_SUCCESS:
      return { ...state, ratingPermission: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload.data };
    default:
      return state;
  }
};

export const productGenreListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_GENRE_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_GENRE_LIST_SUCCESS:
      return { loading: false, genres: action.payload };
    case PRODUCT_GENRE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
