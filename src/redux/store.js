import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice/slice";

export const store = configureStore({
  reducer: {
    user,
  },
});
