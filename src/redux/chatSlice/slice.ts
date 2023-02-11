//@ts-nocheck
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth } from "../../firebase";

export interface InitialStateType {
  chatId: null | string;
  user: any;
}

const initialState = {
  chatId: null,
  user: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat(state: InitialStateType, action: PayloadAction<InitialStateType>) {
      state.user = action.payload;
      state.chatId =
        auth.currentUser!.uid > action.payload.uid
          ? auth.currentUser!.uid + action.payload.uid
          : action.payload.uid + auth.currentUser!.uid;

      console.log(state.user  );
    },
  },
});

export const { setChat } = chatSlice.actions;

export default chatSlice.reducer;
