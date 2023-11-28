import { Navigate } from "react-router-dom";

import { PATH_DASHBOARD } from "../routes/paths";
import { getAuthState } from "../slices/auth/authSlice";
import { useSelector } from "react-redux";

export function GuestGuard({ children }) {
  const { isAuthenticated } = useSelector(getAuthState);

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
