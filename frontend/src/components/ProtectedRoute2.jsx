import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute2() {
  const token =
    useSelector((state) => state.auth.loginData.token) ||
    localStorage.getItem("jwtToken");

  return <>{token ? <Outlet /> : <Navigate to={"/login"} />}</>;
}

export default ProtectedRoute2;
