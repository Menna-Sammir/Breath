import { useAccount } from "../../lib/hooks/useAccounts";
import { Navigate, Outlet, useLocation } from "react-router";

export default function RequiredAuth() {
  const { currentUser, loadingUserInfo } = useAccount();
  const location = useLocation();

  if (loadingUserInfo) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
