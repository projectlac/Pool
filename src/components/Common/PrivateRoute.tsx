import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  //Check Login

  const isLogin = Boolean(localStorage.getItem("access_token"));
  //   if (isLogin) return <Navigate to="/login" />;
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};
