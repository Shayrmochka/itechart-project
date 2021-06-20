import {
  GET_ACCEPTED_ORDERS,
  GET_ORDERS,
  GET_SORTED_ORDERS,
  REMOVE_ACCEPTED_ORDERS,
  REMOVE_ORDERS,
  REMOVE_SORTED_ORDERS,
} from './types';

interface OrdersState {
  allOrders: Array<any>,
  sortedOrders: Array<any>,
  acceptedOrders: Array<any>,
}

const initialState: OrdersState = {
  allOrders: [],
  sortedOrders: [],
  acceptedOrders: [],
};

const ordersReducer = (state = initialState, action: { type: string; payload: any; }) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        allOrders: [...action.payload],
      };
    case REMOVE_ORDERS:
      return { ...state, allOrders: [] };
    case GET_SORTED_ORDERS:
      return {
        ...state,
        sortedOrders: [...action.payload],
      };
    case REMOVE_SORTED_ORDERS:
      return { ...state, sortedOrders: [] };
    case GET_ACCEPTED_ORDERS:
      return {
        ...state,
        acceptedOrders: [...action.payload],
      };
    case REMOVE_ACCEPTED_ORDERS:
      return { ...state, acceptedOrders: [] };

    default:
      return state;
  }
};

export default ordersReducer;
