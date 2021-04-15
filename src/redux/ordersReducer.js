import {
  GET_ACCEPTED_ORDERS,
  GET_ORDERS,
  GET_SORTED_ORDERS,
  REMOVE_ACCEPTED_ORDERS,
  REMOVE_ORDERS,
  REMOVE_SORTED_ORDERS,
} from "./types";

const initialState = {
  allOrders: [],
  sortedOrders: [],
  acceptedOrders: [],
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        allOrders: [...action.payload],
      };
    case REMOVE_ORDERS:
      return { allOrders: [] };
    case GET_SORTED_ORDERS:
      return {
        ...state,
        sortedOrders: [...action.payload],
      };
    case REMOVE_SORTED_ORDERS:
      return { sortedOrders: [] };
    case GET_ACCEPTED_ORDERS:
      return {
        ...state,
        acceptedOrders: [...action.payload],
      };
    case REMOVE_ACCEPTED_ORDERS:
      return { acceptedOrders: [] };

    default:
      return state;
  }
};
