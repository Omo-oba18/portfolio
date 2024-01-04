// skillSlice.js

import { createSlice, createSelector } from "@reduxjs/toolkit";
import { createSkillBuilder } from "./thunk/create-skill";
import { fetchSkillsBuilder } from "./thunk/fetchSkill";
import { editSkillBuilder } from "./thunk/edit-skill";
import { getSkillByIdBuilder } from "./thunk/getSkillById";

// Define an initial state for the skill slice
const initialState = {
  skills: [],
  skill: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
};

// Create a skill slice with reducers for handling the async thunks
const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    resetState(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    addSkill(state, action) {
      state.skills.push(action.payload);
    },
    removeSkill(state, action) {
      state.skills = state.skills.filter(
        (skill) => skill.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    createSkillBuilder(builder);
    fetchSkillsBuilder(builder);
    editSkillBuilder(builder);
    getSkillByIdBuilder(builder);
  },
});

// Export the reducer
export default skillSlice.reducer;
// Actions
export const { addSkill, removeSkill, resetState } = skillSlice.actions;

// Selectors
const getState = (state) => state;

export const getSkillState = createSelector([getState], (state) => state.skill);
