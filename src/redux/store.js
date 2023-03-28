import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/authSlice";
import toastReducer from "./modules/toastSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
