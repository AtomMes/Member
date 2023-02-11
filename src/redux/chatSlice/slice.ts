import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth } from "../../firebase";

export interface User {
  displayName: string | null;
  photoURL: string | null;
  uid: string | null;
}

export interface InitialStateType {
  chatId: string;
  user: User;
}

const initialState = {
  chatId: "",
  user: {
    displayName: null,
    photoURL: null,
    uid: null,
  },
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat(state, action) {
      state.user = action.payload;
      state.chatId =
        auth.currentUser!.uid > action.payload.uid
          ? auth.currentUser!.uid + action.payload.uid
          : action.payload.uid + auth.currentUser!.uid;

      console.log(state.user);
    },
  },
});

export const { setChat } = chatSlice.actions;

export default chatSlice.reducer;
