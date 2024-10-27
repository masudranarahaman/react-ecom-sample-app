import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SignIn from "../pages/SignIn";

const ProtectedRoute = () => {
  // api call
  // redux-store ->  user login

  // const isSignedIn = true;
  const userData =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData"));

  return userData.isSignedIn ? <Outlet /> : <SignIn />;
};

export default ProtectedRoute;
