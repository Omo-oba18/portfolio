import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserReject, getUserSuccess, hasError } from "../authSlice";

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Perform logout API call
      localStorage.removeItem("userData");
      dispatch(getUserReject()); // Dispatch logout action
    } catch (error) {
      dispatch(hasError(error.message)); // Dispatch error action
      return rejectWithValue({ errorMessage: "Failed to log out" });
    }
  }
);

export const logoutBuilder = (builder) => {
  builder.addCase(logoutUser.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(logoutUser.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.user.push(action.payload);
  });
  builder.addCase(logoutUser.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};
