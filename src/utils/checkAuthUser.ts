import { getAuth, onAuthStateChanged } from "firebase/auth";
import { store } from "../redux/store";
import { removeUser, setUser } from "../redux/userSlice/slice";

export const checkLoggedInUser = () => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = {
        username: user.displayName,
        imageURL: user.photoURL,
        email: user.email,
        token: user.refreshToken,
        id: user.uid,
      };
      store.dispatch(setUser(userData));
    } else {
      store.dispatch(removeUser());
    }
  });
  return () => unsubscribe();
};
