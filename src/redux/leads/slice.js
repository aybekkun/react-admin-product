import { createSlice } from "@reduxjs/toolkit";
import { fetchLeads } from "./asyncActions";

const initialState = {
  data: [],
  total: 0,
  currentPage: 1,
  isLoading: false,
};

export const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setLeadPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLeads.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(fetchLeads.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLeads.rejected, (state) => {
      state.isLoading = false;
      state.data = [];
      state.total = 0;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setLeadPage } = leadSlice.actions;

export default leadSlice.reducer;
