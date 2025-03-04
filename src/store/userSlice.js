import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null, // Default value
  // email: null,
  //   isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.username = action.payload.username;
      // state.email = action.payload.email;
      //   state.isAuthenticated = action.payload.isAuthenticated;
    },
    logout: (state) => {
      state.username = null;
      // state.email = null;
      //   state.isAuthenticated = false;
    },
  },
});

export const { setUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;