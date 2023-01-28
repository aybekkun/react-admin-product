import { createSlice } from "@reduxjs/toolkit";
import { createInstruments, fetchInstruments } from "./asyncActions";

const initialState = {
  data: [],
  total: 0,
  currentPage: 1,
  isLoading: false,
  count: 0,
  isSending: false,
};

export const instrumentsSlice = createSlice({
  name: "instruments",
  initialState,
  reducers: {
    setInstrumentsCount(state) {
      state.count++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInstruments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(fetchInstruments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchInstruments.rejected, (state) => {
      state.isLoading = false;
      state.data = [];
      state.total = 0;
    });
    builder.addCase(createInstruments.fulfilled, (state) => {
      state.isSending = false;
    });
    builder.addCase(createInstruments.pending, (state) => {
      state.isSending = true;
    });
    builder.addCase(createInstruments.rejected, (state) => {
      state.isSending = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setInstrumentsCount } = instrumentsSlice.actions;

export default instrumentsSlice.reducer;
