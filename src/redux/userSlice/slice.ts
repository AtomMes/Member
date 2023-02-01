import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateType {
  username: string | null;
  email: string | null;
  imageURL: string | null;
  token: string | null;
  id: string | null;
}

const initialState = {
  username: null,
  email: null,
  imageURL: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: InitialStateType, action: PayloadAction<InitialStateType>) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.imageURL = action.payload.imageURL;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state: InitialStateType) {
      state.username = null;
      state.email = null;
      state.imageURL = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
