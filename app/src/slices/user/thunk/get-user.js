import { api } from "../../../http-common";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (userName, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/info?name=${userName}`);
      return response.data; // If response.data is an array of user, return it directly
    } catch (error) {
      return rejectWithValue({ errorMessage: "Failed to get user" });
    }
  }
);

export const getUserInfoBuilder = (builder) => {
  builder.addCase(getUserInfo.pending, (state) => {
    state.isLoading = true;
    state.isSuccess = false;
    state.isError = false;
    state.errorMessage = null;
  });
  builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.errorMessage = null;
    state.user = payload.data; // Update state with the response directly
  });
  builder.addCase(getUserInfo.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
    state.user = null;
  });
};
