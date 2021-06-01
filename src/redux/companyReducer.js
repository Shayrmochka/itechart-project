import { GET_CHOSEN_COMPANY, REMOVE_CHOSEN_COMPANY } from './types';

const initialState = {
  chosenCompany: {},
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHOSEN_COMPANY:
      return {
        ...state,
        chosenCompany: { ...state.chosenCompany, ...action.payload },
      };
    case REMOVE_CHOSEN_COMPANY:
      return { chosenCompany: {} };

    default:
      return state;
  }
};

export default companyReducer;
