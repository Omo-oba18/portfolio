// educationSlice.js

import { createSlice, createSelector } from "@reduxjs/toolkit";
import { createEducationBuilder } from "./thunk/create-education";
import { fetchEducationsBuilder } from "./thunk/fetch-education";
import { editEducationBuilder } from "./thunk/edit-education";
import { getEducationByIdBuilder } from "./thunk/getEducationById";

// Define an initial state for the education slice
const initialState = {
  educations: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
};

// Create a education slice with reducers for handling the async thunks
const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    resetState(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    addEducation(state, action) {
      state.educations.push(action.payload);
    },
    removeEducation(state, action) {
      state.educations = state.educations.filter(
        (education) => education.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    createEducationBuilder(builder);
    fetchEducationsBuilder(builder);
    editEducationBuilder(builder);
    getEducationByIdBuilder(builder);
  },
});

// Export the reducer
export default educationSlice.reducer;
// Actions
export const { resetState } = educationSlice.actions;

// Selectors
const getState = (state) => state;

export const getEducationState = createSelector(
  [getState],
  (state) => state.education
);
