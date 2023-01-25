import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice/slice";
import posts from "./postsSlice/slice";

export const store = configureStore({
  reducer: {
    user,
    posts,
  },
});
