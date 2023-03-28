import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "../../../redux/modules/authSlice";

const RequiresUnAuth = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated && currentUser) {
    const isAdmin = currentUser.role === "admin";

    return <Navigate to={isAdmin ? "/admin" : "/"} />;
  }

  return children;
};

export default RequiresUnAuth;
