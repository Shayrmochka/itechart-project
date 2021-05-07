import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Loader from "./components/Loader";
import NavBar from "./components/NavBar";

import { useAuth } from "./hooks/auth.hooh";

import { useRoutes } from "./routes";

import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, getUserAuthentication } from "./redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fafafa",
  },
}));

function App() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.app.isLoading);
  const user = useSelector((state) => state.user.currentUser);
  const isAuthenticated = user.hasOwnProperty("_id");
  dispatch(getUserAuthentication(isAuthenticated));
  const { logout } = useAuth();

  const routes = useRoutes(isAuthenticated, logout);

  const [currentUser, setCurrentUser] = useState({});

  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    if (user.token && isAuthenticated) {
      dispatch(fetchOrders(user));
    }
  }, [user.token, isAuthenticated]);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <BrowserRouter>
        {
          <NavBar
            currentUser={currentUser}
            isAuthenticated={isAuthenticated}
            logout={logout}
            orders={orders.allOrders}
            sortedOrders={orders.sortedOrders}
            ordersSortedByAccepted={orders.acceptedOrders}
          />
        }

        {routes}
      </BrowserRouter>
    </div>
  );
}

export default App;
