// authSlice.js

import { createSlice, createSelector } from "@reduxjs/toolkit";
import { loginBuilder } from "./thunk/login";
import { registerBuilder } from "./thunk/register";
import { logoutBuilder } from "./thunk/logout";

// Define an initial state for the auth slice
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  errorMessage: null,
  user: null,
};

// Create an auth slice with reducers for handling the async thunks
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState(state) {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = null;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = null;
      state.isInitialized = true;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    getUserReject(state) {
      state.isLoading = false;
      state.isInitialized = true;
      state.isAuthenticated = false;
      state.user = null;
    },
    authenticateUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    loginBuilder(builder);
    registerBuilder(builder);
    logoutBuilder(builder);
  },
});

// Export the reducer
export default authSlice.reducer;

export const { authenticateUser } = authSlice.actions;

export const {
  resetState,
  startLoading,
  hasError,
  getUserSuccess,
  getUserReject,
} = authSlice.actions;

// Selectors
const getState = (state) => state;

export const getAuthState = createSelector([getState], (state) => state.auth);
