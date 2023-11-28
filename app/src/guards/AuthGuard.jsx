import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, authenticateUser } from "../slices/auth/authSlice";
import { PATH_AUTH } from "../routes/paths";

export function AuthGuard({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(getAuthState);
  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState(null);

  // UseEffect to check if user data is saved in localStorage when the app loads
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      // Dispatch an action to authenticate the user using the retrieved data
      dispatch(authenticateUser(parsedUserData));
    }
  }, [dispatch]);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={PATH_AUTH.login} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
