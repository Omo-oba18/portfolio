import { api } from "../../../http-common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthState } from "../../auth/authSlice";

export const getSkillById = createAsyncThunk(
  "skill/getSkillById",
  async (skillId, { rejectWithValue, getState }) => {
    const authState = getAuthState(getState());
    if (!authState.isAuthenticated) {
      return rejectWithValue({ errorMessage: "Not logged in" });
    }

    const { _id: userId } = authState.user.user || {};
    if (!userId) {
      return rejectWithValue({ errorMessage: "User ID not available" });
    }

    try {
      const response = await api.get(`/skill/${skillId}`);
      return response.data; // If response.data is an array of skills, return it directly
    } catch (error) {
      return rejectWithValue({ errorMessage: "Failed to get skills" });
    }
  }
);

export const getSkillByIdBuilder = (builder) => {
  builder.addCase(getSkillById.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(getSkillById.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.skill = payload.data; // Update state with the response directly
  });
  builder.addCase(getSkillById.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};
