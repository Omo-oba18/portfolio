import { api } from "../../../http-common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthState } from "../../auth/authSlice";

export const getEducationById = createAsyncThunk(
  "education/getEducationById",
  async (educationId, { rejectWithValue, getState }) => {
    const authState = getAuthState(getState());
    if (!authState.isAuthenticated) {
      return rejectWithValue({ errorMessage: "Not logged in" });
    }

    const { _id: userId } = authState.user.user || {};
    if (!userId) {
      return rejectWithValue({ errorMessage: "User ID not available" });
    }

    try {
      const response = await api.get(`/education/${educationId}`);
      return response.data; // If response.data is an array of educations, return it directly
    } catch (error) {
      return rejectWithValue({ errorMessage: "Failed to get educations" });
    }
  }
);

export const getEducationByIdBuilder = (builder) => {
  builder.addCase(getEducationById.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(getEducationById.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.errorMessage = null;
    state.educations = payload.data; // Update state with the response directly
  });
  builder.addCase(getEducationById.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};
