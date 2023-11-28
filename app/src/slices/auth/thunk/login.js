import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../http-common";
import { getUserReject, getUserSuccess, hasError } from "../authSlice";

// Async thunks for login, register, and logout
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, remember }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("auth/login", {
        email,
        password,
        remember,
      });
      dispatch(getUserSuccess(response.data));
      if (remember) {
        // Save user data in localStorage
        localStorage.setItem("userData", JSON.stringify(response.data));
      } else {
        // Clear user data from localStorage if 'Remember Me' is not checked
        localStorage.removeItem("userData");
      }
    } catch (error) {
      let errorMessage = "Failed to log in. Please try again."; // Default error message

      if (error.message) {
        errorMessage = error.message; // Use the error message if available
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message; // Extract the error message from the response data
      }

      dispatch(hasError(errorMessage));
      return rejectWithValue({ errorMessage });
    }
  }
);

export const loginBuilder = (builder) => {
  builder.addCase(loginUser.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(loginUser.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.user.push(action.payload);
  });
  builder.addCase(loginUser.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};
