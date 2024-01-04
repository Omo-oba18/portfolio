import { api } from "../../../http-common";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/project`);
      return response.data; // If response.data is an array of projects, return it directly
    } catch (error) {
      return rejectWithValue({ errorMessage: "Failed to get projects" });
    }
  }
);

export const fetchProjectsBuilder = (builder) => {
  builder.addCase(fetchProjects.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(fetchProjects.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.projects = payload; // Update state with the response directly
  });
  builder.addCase(fetchProjects.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};