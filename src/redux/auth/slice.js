import { createSlice } from "@reduxjs/toolkit";
import {
  registrationOperation,
  loginOperation,
  loginOutOperation,
  refreshUserOperation,
} from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registrationOperation.pending, (state) => {
        state.error = null;
      })
      .addCase(registrationOperation.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(registrationOperation.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(loginOperation.pending, (state) => {
        state.error = null;
      })
      .addCase(loginOperation.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginOperation.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(loginOutOperation.pending, (state) => {
        state.error = null;
      })
      .addCase(loginOutOperation.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
        };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(loginOutOperation.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(refreshUserOperation.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUserOperation.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUserOperation.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      });
  },
});

export const authReducer = authSlice.reducer;
