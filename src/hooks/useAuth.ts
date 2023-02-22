import { useAppSelector } from "./redux-hooks";
import { useSelector } from "react-redux";

export function useAuth() {
  const isAuth = localStorage.getItem("isAuth");
  return {
    isAuth,
  };
}
