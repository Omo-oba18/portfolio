import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getUserInfoBuilder } from "./thunk/get-user";
import { updateUserInfoBuilder } from "./thunk/edit-user";

const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
    updateUser(state, action) {
      state.isLoading = true;
      state.user = state.user.filter((user) => user.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    getUserInfoBuilder(builder);
    updateUserInfoBuilder(builder);
  },
});

export default userSlice.reducer;

export const { updateUser, resetState } = userSlice.actions;
const getState = (state) => state;

export const getUserState = createSelector([getState], (state) => state.user);
