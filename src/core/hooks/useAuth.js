import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoadUser } from "../../features/authentication/services/auth.service";
import {
  initialize,
  logOut,
  selectCurrentToken,
  selectIsAuthenticated,
  selectIsInitialized,
} from "../../redux/modules/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  const currentToken = useSelector(selectCurrentToken);
  const isInitialized = useSelector(selectIsInitialized);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const { loadUser, isLoading } = useLoadUser();

  const loadLoggedInUser = useCallback(async () => {
    if (!currentToken && !isAuthenticated && !isInitialized) {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        const { data, error } = await loadUser();
        if (!error && data) {
          return dispatch(initialize({ accessToken, user: data }));
        } else {
          dispatch(logOut());
        }
      }
      dispatch(initialize());
    }
  }, [currentToken, isInitialized, isAuthenticated, dispatch, loadUser]);

  useEffect(() => {
    loadLoggedInUser();
  }, []);

  return {
    isLoading,
    isAuthenticated,
    isInitialized,
  };
};

export default useAuth;
