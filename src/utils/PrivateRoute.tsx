import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = () => {
  const { isAuth } = useAuth();

  console.log(isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
