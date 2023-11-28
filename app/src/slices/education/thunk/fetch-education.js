import { api } from "../../../http-common";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEducations = createAsyncThunk(
  "education/fetchEducations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/education`);
      return response.data; // If response.data is an array of educations, return it directly
    } catch (error) {
      return rejectWithValue({ errorMessage: "Failed to get educations" });
    }
  }
);

export const fetchEducationsBuilder = (builder) => {
  builder.addCase(fetchEducations.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(fetchEducations.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.educations = payload; // Update state with the response directly
  });
  builder.addCase(fetchEducations.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};