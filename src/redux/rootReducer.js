import { combineReducers } from 'redux';
import appReducer from './appReducer';

import userReducer from './userReducer';
import ordersReducer from './ordersReducer';
import companyReducer from './companyReducer';

const rootReducer = combineReducers({
  user: userReducer,
  orders: ordersReducer,
  app: appReducer,
  company: companyReducer,
});

export default rootReducer;
