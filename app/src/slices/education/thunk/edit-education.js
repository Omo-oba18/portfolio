import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthState } from "../../auth/authSlice";
import { api } from "../../../http-common";
import moment from "moment";

export const editEducation = createAsyncThunk(
  "educations/editEducation",
  async ({ educationId, updatedData }, { rejectWithValue, getState }) => {
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
      await api.put(`/education/${educationId}`, {
        ...updatedData,
        updatedAt: date,
        userId: userId,
      });
    } catch (error) {
      return rejectWithValue({ errorMessage: error.response.data.message });
    }
  }
);

export const editEducationBuilder = (builder) => {
  builder.addCase(editEducation.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(editEducation.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.errorMessage = null;
    state.educations = payload;
  });
  builder.addCase(editEducation.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};
