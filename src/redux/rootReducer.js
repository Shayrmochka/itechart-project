import { combineReducers } from "redux";
import { appReducer } from "./appReducer";

import { userReducer } from "./userReducer";
import { ordersReducer } from "./ordersReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  orders: ordersReducer,
  app: appReducer,
});
