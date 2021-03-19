import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Loader from "./components/Loader";
import NavBar from "./components/NavBar";
import { AuthContext } from "./context/AuthContext";
import Checkout from "./forms/checkout-forms/Checkout";
import Feedback from "./forms/Feedback";
import SignIn from "./forms/SignIn";
import SignUp from "./forms/SignUp";
import { useAuth } from "./hooks/auth.hooh";
import { useHttp } from "./hooks/http.hook";

import { useRoutes } from "./routes";

function App() {
  const { token, login, logout, userId, ready, userData } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <div>
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

      {/* <SignIn />
      <SignUp />
      <Feedback />
      <Checkout /> */}
    </div>
  );
}

export default App;
