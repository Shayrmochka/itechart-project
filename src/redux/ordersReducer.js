import { GET_ACCEPTED_ORDERS, REMOVE_ACCEPTED_ORDERS } from "./types";

const initialState = {
  acceptedOrders: [],
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCEPTED_ORDERS:
      return {
        ...state,
        acceptedOrders: [...state.acceptedOrders, ...action.payload],
      };
    case REMOVE_ACCEPTED_ORDERS:
      return { ...state, acceptedOrders: {} };

    default:
      return state;
  }
};
