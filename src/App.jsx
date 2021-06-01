import { makeStyles } from '@material-ui/core';
import React, { useEffect, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './components/Loader';
import NavBar from './components/NavBar';
import useAuth from './hooks/auth.hooh';
import useRoutes from './routes';
import { fetchOrders } from './redux/actions';
import useMessage from './hooks/message.hook';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#fafafa',
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const message = useMessage();
  const isLoading = useSelector((state) => state.app.isLoading);

  const user = useSelector((state) => state.user.currentUser);
  const orders = useSelector((state) => state.orders);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const routes = useRoutes(isAuthenticated, logout);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchOrders(user, message));
    }
  }, [isAuthenticated, user, dispatch, message]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <NavBar
            currentUser={user}
            isAuthenticated={isAuthenticated}
            logout={logout}
            orders={orders.allOrders}
            sortedOrders={orders.sortedOrders}
            ordersSortedByAccepted={orders.acceptedOrders}
          />

          {routes}
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
