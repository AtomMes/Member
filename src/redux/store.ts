import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice/slice";
import chat from "./chatSlice/slice";

export const store = configureStore({
  reducer: {
    user,
    chat,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
