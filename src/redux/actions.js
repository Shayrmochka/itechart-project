import fetchData from '../api/api';
import {
  GET_CURRENT_USER,
  REMOVE_CURRENT_USER,
  GET_USER_AUTHENTICATION,
  HIDE_LOADER,
  SHOW_LOADER,
  GET_ACCEPTED_ORDERS,
  REMOVE_ACCEPTED_ORDERS,
  GET_ORDERS,
  REMOVE_ORDERS,
  GET_CHOSEN_COMPANY,
  REMOVE_CHOSEN_COMPANY,
  GET_SORTED_ORDERS,
  REMOVE_SORTED_ORDERS,
} from './types';

// USER
export function getCurrentUser(currentUser) {
  return {
    type: GET_CURRENT_USER,
    payload: currentUser,
  };
}

export function removeCurrentUser() {
  return {
    type: REMOVE_CURRENT_USER,
  };
}

export function getUserAuthentication(isAuthenticated) {
  return {
    type: GET_USER_AUTHENTICATION,
    payload: isAuthenticated,
  };
}

// APP
export function showLoader() {
  return {
    type: SHOW_LOADER,
  };
}

export function hideLoader() {
  return {
    type: HIDE_LOADER,
  };
}

// ORDERS
export function fetchOrders(user, message) {
  const getSortedOrders = (orders) => {
    if (user.type === 'user') {
      return orders.filter((order) => order.status !== 'waiting');
    }
    if (user.type === 'company') {
      return orders.filter((order) => !order.checked);
    }

    return orders;
  };

  const getAcceptedOrders = (orders) => orders.filter((order) => order.status === 'accepted');

  return async (dispatch) => {
    try {
      const orders = await fetchData.get('/api/order', user.token);
      if (typeof orders !== 'object') {
        throw new Error('Bad response');
      }

      dispatch({ type: GET_ORDERS, payload: orders });

      dispatch({
        type: GET_SORTED_ORDERS,
        payload: getSortedOrders(orders),
      });

      dispatch({
        type: GET_ACCEPTED_ORDERS,
        payload: getAcceptedOrders(orders),
      });
    } catch (e) {
      message(e);
    }
  };
}

export function removeOrders() {
  return {
    type: REMOVE_ORDERS,
  };
}

export function removeSortedOrders() {
  return {
    type: REMOVE_SORTED_ORDERS,
  };
}

export function removeAcceptedOrders() {
  return {
    type: REMOVE_ACCEPTED_ORDERS,
  };
}

// COMPANY
export function getChosenCompany(company) {
  return {
    type: GET_CHOSEN_COMPANY,
    payload: company,
  };
}

export function removeChosenCompany() {
  return {
    type: REMOVE_CHOSEN_COMPANY,
  };
}
