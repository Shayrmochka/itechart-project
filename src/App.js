import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Loader from "./components/Loader";
import NavBar from "./components/NavBar";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth.hooh";
import { useHttp } from "./hooks/http.hook";

import { useRoutes } from "./routes";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fafafa",
  },
}));

function App() {
  const classes = useStyles();
  const { token, login, logout, userId, ready, userData } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          userId,
          userData,
          isAuthenticated,
        }}
      >
        <BrowserRouter>
          {isAuthenticated && <NavBar currentUser={userData} />}

          {routes}
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
