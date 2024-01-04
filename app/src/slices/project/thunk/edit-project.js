import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthState } from "../../auth/authSlice";
import { api } from "../../../http-common";
import moment from "moment";

export const editProject = createAsyncThunk(
  "projects/editProject",
  async ({ projectId, updatedData }, { rejectWithValue, getState }) => {
    const authState = getAuthState(getState());
    if (!authState.isAuthenticated) {
      return rejectWithValue({ errorMessage: "Not logged in" });
    }

    const { _id: userId } = authState.user.user || {};
    if (!userId) {
      return rejectWithValue({ errorMessage: "User ID not available" });
    }

    const date = moment.now();

    try {
      await api.put(`/project/${projectId}`, {
        ...updatedData,
        updatedAt: date,
        userId: userId,
      });
    } catch (error) {
      return rejectWithValue({ errorMessage: error.response.data.message });
    }
  }
);

export const editProjectBuilder = (builder) => {
  builder.addCase(editProject.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(editProject.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.errorMessage = null;
    state.projects = payload;
  });
  builder.addCase(editProject.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};
