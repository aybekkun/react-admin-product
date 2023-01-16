import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
};

export const effectSlice = createSlice({
  name: "effect",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActive } = effectSlice.actions;

export default effectSlice.reducer;
