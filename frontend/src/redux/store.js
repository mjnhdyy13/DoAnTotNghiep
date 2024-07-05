// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import speechReducer from "./slice/speechSlice";

const store = configureStore({
  reducer: {
    speech: speechReducer,
  },
});

export default store;
