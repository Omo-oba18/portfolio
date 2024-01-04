import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { getAuthState } from "../../auth/authSlice";
import { api } from "../../../http-common";
import moment from "moment";

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (newProject, { rejectWithValue, getState }) => {
    
    const authState = getAuthState(getState());
    if (!authState.isAuthenticated) {
      return rejectWithValue({ errorMessage: "Not logged in" });
    }

    const projectId = nanoid();
    const date = moment.now();

    try {
      await api.post("/project", {
        ...newProject,
        id: projectId,
        userId: authState.user?._id,
        createdAt: date,
        updatedAt: date,
      });
    } catch (error) {
      return rejectWithValue({ errorMessage: error.response.data.message });
    }
  }
);

export const createProjectBuilder = (builder) => {
  builder.addCase(createProject.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(createProject.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.projects.push(action.payload);
  });
  builder.addCase(createProject.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};
