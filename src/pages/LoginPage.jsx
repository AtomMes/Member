import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginAndRegister from "../components/LoginAndRegister";
import { setUser } from "../redux/userSlice/slice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onLogin(email, password) {
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
        navigate("/");
      });
    }
  }

  return (
    <div>
      <LoginAndRegister title="Login" to="/register" handleClick={onLogin} />
    </div>
  );
};

export default LoginPage;
