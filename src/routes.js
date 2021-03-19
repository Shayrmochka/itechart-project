import React from "react";
import { Switch, Route, Redirect } from "react-router";
import SignIn from "./pages/auth-pages/SignIn";
import SignUp from "./pages/auth-pages/SignUp";
import SignInCompany from "./pages/auth-pages/SignInCompany";
import SignUpCompany from "./pages/auth-pages/SignUpCompany";
import DetailCompanyPage from "./pages/companies/DetailCompanyPage";
import CompaniesPage from "./pages/companies/CompaniesPage";
import UsersPage from "./pages/users/UsersPage";
import CreateOrderPage from "./pages/CreateOrderPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
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
        <Redirect to="/create" />
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
