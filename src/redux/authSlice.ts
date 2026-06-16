import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { validUsers } from "../data/userCredentials.js";

type UserCredential = {
  username: string;
  password: string;
};

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "authConfig",
  initialState,

  reducers: {
    signIn: (state, action: PayloadAction<UserCredential>) => {
      const { username, password } = action.payload;

      const userFound = validUsers.some((user) => {
        return user.username == username && user.password == password;
      })

      state.isLoggedIn = userFound;
    },
  },
});

export const { signIn } = authSlice.actions;
export default authSlice.reducer;
