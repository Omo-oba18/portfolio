import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { getAuthState } from "../../auth/authSlice";
import { api } from "../../../http-common";
import moment from "moment";

export const createSkill = createAsyncThunk(
  "skills/createSkill",
  async (newSkill, { rejectWithValue, getState }) => {
    const authState = getAuthState(getState());
    if (!authState.isAuthenticated) {
      return rejectWithValue({ errorMessage: "Not logged in" });
    }

    const { _id: userId } = authState.user.user || {}; // Destructure _id from user or set as undefined
    if (!userId) {
      return rejectWithValue({ errorMessage: "User ID not available" });
    }
    const skillId = nanoid();
    const date = moment.now();

    try {
      await api.post("/skill", {
        ...newSkill,
        id: skillId,
        userId: userId,
        createdAt: date,
        updatedAt: date,
      });
    } catch (error) {
      return rejectWithValue({ errorMessage: "Failed to create skill" });
    }
  }
);

export const createSkillBuilder = (builder) => {
  builder.addCase(createSkill.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(createSkill.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.skills.push(action.payload);
  });
  builder.addCase(createSkill.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};
