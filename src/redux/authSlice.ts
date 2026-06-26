import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  loginError: false,
};

const authSlice = createSlice({
  name: "authConfig",
  initialState,

  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setLoginError: (state, action: PayloadAction<boolean>) => {
      state.loginError = action.payload;
    },
  },
});

export const { setIsLoggedIn, setLoginError } = authSlice.actions;
export default authSlice.reducer;
