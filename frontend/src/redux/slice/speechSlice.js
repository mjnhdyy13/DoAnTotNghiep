// src/redux/speechSlice.js
import { createSlice } from "@reduxjs/toolkit";

const speechSlice = createSlice({
  name: "speech",
  initialState: {
    recognizedText: "",
  },
  reducers: {
    setRecognizedText: (state, action) => {
      state.recognizedText = action.payload;
    },
  },
});

export const { setRecognizedText } = speechSlice.actions;
export default speechSlice.reducer;
