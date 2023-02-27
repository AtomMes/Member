import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setUser } from "../redux/userSlice/slice";

import LoginAndRegister from "../components/LoginAndRegister";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth";

const RegisterPage: React.FC = () => {
  const [err, setErr] = React.useState<boolean>(false);
  const [fieldErr, setFieldErr] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async (
    email: string,
    password: string,
    username?: string | null
  ) => {
    if (email && password && username) {
      setFieldErr(false);
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          await setDoc(doc(db, "userChats", user.uid), {});

          await setDoc(doc(db, "users", user.uid), {
            searchUsername: username.toLowerCase(),
            username,
            email,
            id: user.uid,
            requests: [],
            contacts: [],
          });
          dispatch(
            setUser({
              username: user.displayName,
              email: user.email,
              id: user.uid,
              imageURL: null,
              token: user.refreshToken,
            })
          );
          localStorage.setItem("isAuth", "true");
          navigate("/");
        })
        .catch((err) => {
          setErr(true);
        });
    } else {
      setFieldErr(true);
    }
  };

  React.useEffect(() => {
    setErr(false);
  }, []);

  const { isAuth } = useAuth();

  console.log(isAuth);
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <LoginAndRegister
        title="Register"
        header="Become a member"
        to="/login"
        reg
        handleClick={onRegister}
        err={err}
        fieldErr={fieldErr}
      />
    </div>
  );
};

export default RegisterPage;
