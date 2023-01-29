import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setUser } from "../redux/userSlice/slice";

import LoginAndRegister from "../components/LoginAndRegister";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async (email, password, username) => {
    if (email && password && username) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password).then(
        async ({ user }) => {
          const ref = doc(db, "users", user.uid);
          await setDoc(ref, {
            username,
            email,
          });
          if (auth.currentUser) {
            await updateProfile(auth.currentUser, { displayName: username });
          }
          dispatch(
            setUser({
              username: user.displayName,
              email: user.email,
              id: user.uid,
              token: user.refreshToken,
            })
          );
          navigate("/");
        }
      );
    }
  };

  return (
    <div>
      <LoginAndRegister
        title="Register"
        to="/login"
        reg
        handleClick={onRegister}
      />
    </div>
  );
};

export default RegisterPage;
