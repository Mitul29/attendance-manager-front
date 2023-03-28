import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isInitialized: false,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    initialize: (state, action) => {
      const { user = null, accessToken = null } = action.payload || {};
      state.user = user;
      state.token = accessToken;
      state.isInitialized = true;
    },
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;

      localStorage.setItem("access_token", accessToken);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("access_token");
    },
  },
});

export default authSlice.reducer;
export const { initialize, setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsInitialized = (state) => state.auth.isInitialized;
export const selectIsAuthenticated = createSelector(
  selectCurrentUser,
  selectCurrentToken,
  (user, token) => user && token
);
