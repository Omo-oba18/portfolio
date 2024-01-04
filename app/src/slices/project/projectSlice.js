// projectSlice.js

import { createSlice, createSelector } from "@reduxjs/toolkit";
import { createProjectBuilder } from "./thunk/create-project";
import { fetchProjectsBuilder } from "./thunk/fetch-project";
import { editProjectBuilder } from "./thunk/edit-project";
import { getProjectByIdBuilder } from "./thunk/getProjectById";

// Define an initial state for the project slice
const initialState = {
  projects: [],
  project: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
};

// Create a project slice with reducers for handling the async thunks
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    resetState(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    addProject(state, action) {
      state.projects.push(action.payload);
    },
    removeProject(state, action) {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    createProjectBuilder(builder);
    fetchProjectsBuilder(builder);
    editProjectBuilder(builder);
    getProjectByIdBuilder(builder);
  },
});

// Export the reducer
export default projectSlice.reducer;
// Actions
export const { addProject, removeProject, resetState } = projectSlice.actions;

// Selectors
const getState = (state) => state;

export const getProjectState = createSelector([getState], (state) => state.project);
