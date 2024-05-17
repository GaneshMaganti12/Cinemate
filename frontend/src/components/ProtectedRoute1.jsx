import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute1() {
  const token =
    useSelector((state) => state.auth.loginData.token) ||
    localStorage.getItem("jwtToken");

  return <>{token ? <Navigate to={"/home"} /> : <Outlet />}</>;
}

export default ProtectedRoute1;
