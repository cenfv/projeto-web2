import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = localStorage.getItem("authorization");
  if (user) {
    return true;
  }
  return false;
};

export const ProtectedRoutes = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export const LoggedUserRedirect = () => {
  const auth = useAuth();
  return auth ? <Navigate to="/dashboard" /> : <Outlet />;
};
