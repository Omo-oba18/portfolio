import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthState } from "../../auth/authSlice";
import { api } from "../../../http-common";
import moment from "moment";

export const editSkill = createAsyncThunk(
  "skills/editSkill",
  async ({ skillId, updatedData }, { rejectWithValue, getState }) => {
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
      await api.put(`/skill/${skillId}`, {
        ...updatedData,
        updatedAt: date,
        userId: userId,
      });
    } catch (error) {
      return rejectWithValue({ errorMessage: error.response.data.message });
    }
  }
);

export const editSkillBuilder = (builder) => {
  builder.addCase(editSkill.pending, (state) => {
    state.isLoading = true;
    state.isSuccess = false;
    state.isError = false;
    state.errorMessage = null;
  });
  builder.addCase(editSkill.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.errorMessage = null;
    state.skill = payload.data; // Assuming the payload structure is similar to the provided API response
  });
  builder.addCase(editSkill.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.isSuccess = false;
    state.errorMessage = payload?.errorMessage || "Failed to update skill."; // Default error message
  });
};
