import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "../../../redux/modules/authSlice";

const NotFound = () => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  /* Not Logged In */
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (currentUser.role === "admin") {
    return <Navigate to="/admin/members" />;
  }

  if (currentUser.role === "leader") {
    return <Navigate to="/members" />;
  }

  return <Navigate to="/" />;
};

export default NotFound;
