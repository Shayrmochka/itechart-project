import { makeStyles } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";
import "./App.css";
import Loader from "./components/Loader";
import NavBar from "./components/NavBar";

import { useAuth } from "./hooks/auth.hooh";

import { useRoutes } from "./routes";

import { useSelector, useDispatch } from "react-redux";
import {
  getAcceptedOrders,
  getCurrentUser,
  getUserAuthentication,
} from "./redux/actions";
import { useHttp } from "./hooks/http.hook";

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
  const { request } = useHttp();
  const routes = useRoutes(isAuthenticated, logout);

  const [currentUser, setCurrentUser] = useState({});

  // NEW LOGIC ================================================

  const [orders, setOrders] = useState([]);

  const [sortedOrders, setSortedOrders] = useState([]);

  const [ordersSortedByAccepted, setOrdersSortedByAccepted] = useState([]);

  const fetchOrders = useCallback(async (token) => {
    try {
      const fetched = await request("/api/order", "GET", null, {
        Authorization: `Bearer: ${token}`,
      });
      setOrders(fetched);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (user.token && isAuthenticated) {
      console.log("RENDER");

      fetchOrders(user.token);
    }
  }, [fetchOrders, user.token, isAuthenticated]);

  useEffect(() => {
    if (user.type === "user") {
      setSortedOrders(orders.filter((order) => order.status !== "waiting"));
    } else if (user.type === "company") {
      setSortedOrders(orders.filter((order) => !order.checked));
    }
  }, [orders]);

  useEffect(() => {
    setOrdersSortedByAccepted(
      orders.filter((order) => order.status === "accepted")
    );

    dispatch(getAcceptedOrders(ordersSortedByAccepted));
  }, [orders, sortedOrders]);

  // END NEW LOGIC ============================================

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
          />
        }

        {routes}
      </BrowserRouter>
    </div>
  );
}

export default App;
