import { combineReducers } from "redux";
import { appReducer } from "./appReducer";

import { userReducer } from "./userReducer";
import { ordersReducer } from "./ordersReducer";
import { companyReducer } from "./companyReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  orders: ordersReducer,
  app: appReducer,
  company: companyReducer,
});
