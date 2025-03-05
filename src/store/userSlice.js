import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: localStorage.getItem("username") || null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isAdmin: localStorage.getItem("isAdmin") === "true",
  isStaff: localStorage.getItem("isStaff") === "true",
  expiresAt: localStorage.getItem("expiresAt") || null, // Load expiration
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const expiresAt = Date.now() + action.payload.expires_in * 1000; // Convert to timestamp

      state.username = action.payload.username;
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.isAdmin = action.payload.is_admin === 1 ? true: false;
      state.isStaff = action.payload.is_staff === 1 ? true: false;
      state.expiresAt = expiresAt;

      // Store in localStorage
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("accessToken", action.payload.access_token);
      localStorage.setItem("refreshToken", action.payload.refresh_token);
      localStorage.setItem("isAdmin", action.payload.is_admin === 1 ? true: false);
      localStorage.setItem("isStaff", action.payload.is_staff === 1 ? true: false);
      localStorage.setItem("expiresAt", expiresAt);
    },
    logout: (state) => {
      state.username = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAdmin = null;
      state.isStaff = null;
      state.expiresAt = null;

      // Clear localStorage
      localStorage.removeItem("username");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("isStaff");
      localStorage.removeItem("expiresAt");
    },
  },
});

export const { setUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;
