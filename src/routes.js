import React from "react";
import { Switch, Route, Redirect } from "react-router";
import SignIn from "./pages/auth-pages/SignIn";
import SignUp from "./pages/auth-pages/SignUp";
import SignInCompany from "./pages/auth-pages/SignInCompany";
import SignUpCompany from "./pages/auth-pages/SignUpCompany";
import DetailCompanyPage from "./pages/companies/DetailCompanyPage";
import CompaniesPage from "./pages/companies/CompaniesPage";
import UsersPage from "./pages/users/UsersPage";
import CreateOrderPage from "./pages/orders/CreateOrderPage";

import HomePage from "./pages/main-page/HomePage";
import Feedback from "./components/Feedback";
import UserProfile from "./pages/profile/UserProfile";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        <Route path="/profile" exact>
          <UserProfile />
        </Route>
        <Route path="/users" exact>
          <UsersPage />
        </Route>
        <Route path="/companies" exact>
          <CompaniesPage />
        </Route>
        <Route path="/create-order" exact>
          <CreateOrderPage />
        </Route>
        <Route path="/company-detail/:id">
          <DetailCompanyPage />
        </Route>
        <Route path="/feedback">
          <Feedback />
        </Route>

        <Redirect to="/home" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <SignIn />
      </Route>
      <Route path="/signup" exact>
        <SignUp />
      </Route>
      <Route path="/signin-company" exact>
        <SignInCompany />
      </Route>
      <Route path="/signup-company" exact>
        <SignUpCompany />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
