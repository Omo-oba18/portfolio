import { api } from "../../../http-common";
import { getAuthState } from "../../auth/authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (userDataToUpdate, { rejectWithValue, getState }) => {
    const authState = getAuthState(getState());
    if (!authState.isAuthenticated) {
      return rejectWithValue({ errorMessage: "Not logged in" });
    }

    const { _id: userId } = authState.user.user || {}; // Destructure _id from user or set as undefined
    if (!userId) {
      return rejectWithValue({ errorMessage: "User ID not available" });
    }
    try {
      const response = await api.put(`/user/${userId}`, userDataToUpdate);
      return response.data; // If response.data is an array of user, return it directly
    } catch (error) {
      return rejectWithValue({ errorMessage: "Failed to get user" });
    }
  }
);

export const updateUserInfoBuilder = (builder) => {
  builder.addCase(updateUserInfo.pending, (state) => {
    state.isLoading = true;
    state.isSuccess = false;
    state.isError = false;
    state.errorMessage = null;
  });
  builder.addCase(updateUserInfo.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.errorMessage = null;
    state.user = payload; // Update state with the response directly
  });
  builder.addCase(updateUserInfo.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
    state.user = null;
  });
};
