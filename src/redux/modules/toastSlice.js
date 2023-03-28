import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast(state, action) {
      state.push({
        message: action.payload.message,
        type: action.payload.type,
        id: action.payload.id,
      });
    },
    removeToast(state, action) {
      return state.filter((toast) => toast.id !== action.payload.id);
    },
  },
});
export default toastSlice.reducer;

export const { setToast, removeToast } = toastSlice.actions;
export const getToast = (state) => state.toast;
