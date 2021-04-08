import {
  GET_ACCEPTED_ORDERS,
  GET_ORDERS,
  REMOVE_ACCEPTED_ORDERS,
  REMOVE_ORDERS,
} from "./types";

const initialState = {
  allOrders: [],
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
