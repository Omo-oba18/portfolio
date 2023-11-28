import { api } from "../../../http-common";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSkills = createAsyncThunk(
  "skill/fetchSkills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/skill`);
      return response.data; // If response.data is an array of skills, return it directly
    } catch (error) {
      return rejectWithValue({ errorMessage: "Failed to get skills" });
    }
  }
);

export const fetchSkillsBuilder = (builder) => {
  builder.addCase(fetchSkills.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(fetchSkills.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.skills = payload; // Update state with the response directly
  });
  builder.addCase(fetchSkills.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};