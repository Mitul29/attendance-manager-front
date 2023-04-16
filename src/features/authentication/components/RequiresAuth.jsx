import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "../../../redux/modules/authSlice";

const RequiresAuth = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  /* Not Logged In */
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const isAuthorized = allowedRoles.includes(currentUser.role);

  if (!isAuthorized) {
    return <Navigate to={currentUser.role === "admin" ? "/admin" : "/"} />;
  }

  return children;
};

export default RequiresAuth;
