import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../http-common";
import { getUserSuccess, hasError } from "../authSlice";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, phone, password }, { dispatch, rejectWithValue }) => {
    try {
      // Perform register API call using the provided email and password
      const response = await api.post("auth/register", {
        name,
        email,
        phone,
        password,
      });
      dispatch(getUserSuccess(response.data)); // Dispatch success action
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to register. Please try again."; // Default error message

      dispatch(hasError(errorMessage));
      return rejectWithValue({ errorMessage });
    }
  }
);

export const registerBuilder = (builder) => {
  builder.addCase(registerUser.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(registerUser.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.user.push(action.payload);
  });
  builder.addCase(registerUser.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};
