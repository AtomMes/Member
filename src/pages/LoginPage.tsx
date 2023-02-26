import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LoginAndRegister from "../components/LoginAndRegister";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { setUser } from "../redux/userSlice/slice";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function onLogin(email: string, password: string, username: string | null) {
    if (email && password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
        dispatch(
          setUser({
            username: user.displayName,
            imageURL: user.photoURL && user.photoURL,
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        localStorage.setItem("isAuth", "true");
        navigate("/");
      });
    }
  }

  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <LoginAndRegister
        title="Login"
        header="Welcome"
        to="/register"
        handleClick={onLogin}
        err={false}
      />
    </div>
  );
};

export default LoginPage;
