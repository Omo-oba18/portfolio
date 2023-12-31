import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice.js";
import skillReducer from "./slices/skill/skillSlice.js";
import userReducer from "./slices/user/userSlice.js";
import educationReducer from "./slices/education/educationSlice.js";
import projectReducer from "./slices/project/projectSlice.js";

const reducer = {
  auth: authReducer,
  skill: skillReducer,
  user: userReducer,
  education: educationReducer,
  project: projectReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
