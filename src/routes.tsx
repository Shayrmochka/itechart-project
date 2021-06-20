import React, { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/main-page/HomePage';

const SignIn = lazy(() => import('./pages/auth-pages/SignIn'));
const SignUp = lazy(() => import('./pages/auth-pages/SignUp'));
const SignInCompany = lazy(() => import('./pages/auth-pages/SignInCompany'));
const SignUpCompany = lazy(() => import('./pages/auth-pages/SignUpCompany'));
const DetailCompanyPage = lazy(() => import('./pages/companies/DetailCompanyPage'));
const CompaniesPage = lazy(() => import('./pages/companies/CompaniesPage'));
const UsersPage = lazy(() => import('./pages/users/UsersPage'));
const CreateOrderPage = lazy(() => import('./pages/orders/CreateOrderPage'));
const UserProfile = lazy(() => import('./pages/profile/UserProfile'));
const CalendarPage = lazy(() => import('./pages/calendar/CalendarPage'));
const ContactUs = lazy(() => import('./pages/contact-us/ContactUs'));

const useRoutes = (isAuthenticated: boolean, logout: { (): void; }) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        <Route path="/profile" exact>
          <UserProfile logout={logout} />
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
        <Route path="/calendar">
          <CalendarPage />
        </Route>
        <Route path="/contactus" exact>
          <ContactUs />
        </Route>
        <Redirect to="/home" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/home" exact>
        <HomePage />
      </Route>
      <Route path="/signin" exact>
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
      <Route path="/companies" exact>
        <CompaniesPage />
      </Route>
      <Route path="/create-order" exact>
        <CreateOrderPage />
      </Route>
      <Route path="/company-detail/:id">
        <DetailCompanyPage />
      </Route>
      <Route path="/contactus" exact>
        <ContactUs />
      </Route>
      <Redirect to="/home" />
    </Switch>
  );
};

export default useRoutes;
