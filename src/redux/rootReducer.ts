import { combineReducers } from 'redux';
import appReducer from './appReducer';

import userReducer from './userReducer';
import ordersReducer from './ordersReducer';
import companyReducer from './companyReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  orders: ordersReducer,
  app: appReducer,
  company: companyReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootReducer
