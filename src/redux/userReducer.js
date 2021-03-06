import {
  GET_CURRENT_USER,
  REMOVE_CURRENT_USER,
  GET_USER_AUTHENTICATION,
} from './types';

const initialState = {
  currentUser: {},
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload },
        isAuthenticated: true,
      };
    case REMOVE_CURRENT_USER:
      return { ...state, currentUser: {}, isAuthenticated: false };
    case GET_USER_AUTHENTICATION:
      return { ...state, isAuthenticated: action.payload };

    default:
      return state;
  }
};

export default userReducer;
