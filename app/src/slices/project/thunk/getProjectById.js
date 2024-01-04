import { api } from "../../../http-common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthState } from "../../auth/authSlice";

export const getProjectById = createAsyncThunk(
  "project/getProjectById",
  async (projectId, { rejectWithValue, getState }) => {
    const authState = getAuthState(getState());
    if (!authState.isAuthenticated) {
      return rejectWithValue({ errorMessage: "Not logged in" });
    }

    const { _id: userId } = authState.user.user || {};
    if (!userId) {
      return rejectWithValue({ errorMessage: "User ID not available" });
    }

    try {
      const response = await api.get(`/project/${projectId}`);
      return response.data; // If response.data is an array of projects, return it directly
    } catch (error) {
      return rejectWithValue({ errorMessage: "Failed to get projects" });
    }
  }
);

export const getProjectByIdBuilder = (builder) => {
  builder.addCase(getProjectById.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(getProjectById.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.errorMessage = null;
    state.projects = payload.data; // Update state with the response directly
  });
  builder.addCase(getProjectById.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};
