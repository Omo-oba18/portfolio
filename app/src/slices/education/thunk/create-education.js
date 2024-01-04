import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { getAuthState } from "../../auth/authSlice";
import { api } from "../../../http-common";
import moment from "moment";

export const createEducation = createAsyncThunk(
  "educations/createEducation",
  async (newEducation, { rejectWithValue, getState }) => {
    const authState = getAuthState(getState());
    if (!authState.isAuthenticated) {
      return rejectWithValue({ errorMessage: "Not logged in" });
    }

    const educationId = nanoid();
    const date = moment.now();

    try {
      await api.post("/education", {
        ...newEducation,
        id: educationId,
        userId: authState.user?._id,
        createdAt: date,
        updatedAt: date,
      });
    } catch (error) {
      return rejectWithValue({ errorMessage: error.response.data.message });
    }
  }
);

export const createEducationBuilder = (builder) => {
  builder.addCase(createEducation.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(createEducation.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.educations.push(action.payload);
  });
  builder.addCase(createEducation.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};
