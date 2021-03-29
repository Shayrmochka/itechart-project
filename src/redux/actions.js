import {
  GET_CURRENT_USER,
  REMOVE_CURRENT_USER,
  GET_USER_AUTHENTICATION,
  HIDE_LOADER,
  SHOW_LOADER,
} from "./types";

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
