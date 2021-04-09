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
} from "./types";

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
export function getOrders(orders) {
  return {
    type: GET_ORDERS,
    payload: orders,
  };
}

export function removeOrders() {
  return {
    type: REMOVE_ORDERS,
  };
}

export function getAcceptedOrders(acceptedOrders) {
  return {
    type: GET_ACCEPTED_ORDERS,
    payload: acceptedOrders,
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
