/* eslint-disable react/jsx-key */
import AuthorizedRoute from "base-shell/lib/components/AuthorizedRoute";
import UnauthorizedRoute from "base-shell/lib/components/UnauthorizedRoute";
import React, { lazy } from "react";

const SignIn = lazy(() => import("../pages/SignIn/SignIn"));

const About = lazy(() => import("../pages/About"));
const Home = lazy(() => import("../pages/Home/Home"));
const MyAccount = lazy(() => import("../pages/MyAccount/MyAccount"));

const routes = [
  {
    path: "/signin",
    exact: true,
    element: (
      <UnauthorizedRoute>
        <SignIn redirectTo="/home" />
      </UnauthorizedRoute>
    ),
  },
  {
    path: "/about",
    exact: true,
    element: <About />,
  },
  {
    path: "/my_account",
    exact: true,
    element: (
      <AuthorizedRoute>
        <MyAccount />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/home",
    exact: true,
    element: (
      <AuthorizedRoute>
        <Home />
      </AuthorizedRoute>
    ),
  },
];

export default routes;
