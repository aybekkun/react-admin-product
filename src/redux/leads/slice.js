import { createSlice } from "@reduxjs/toolkit";
import { createLeadsComment, fetchLeads } from "./asyncActions";

const initialState = {
  data: [],
  total: 0,
  currentPage: 1,
  isLoading: false,
  count: 0,
  isSendingComment: false,
};

export const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setLeadPage(state, action) {
      state.currentPage = action.payload;
    },
    setLeadsCount(state) {
      state.count++;
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
    builder.addCase(createLeadsComment.fulfilled, (state, action) => {
      state.isSendingComment = false;
    });
    builder.addCase(createLeadsComment.pending, (state) => {
      state.isSendingComment = true;
    });
    builder.addCase(createLeadsComment.rejected, (state) => {
      state.isSendingComment = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setLeadPage, setLeadsCount } = leadSlice.actions;

export default leadSlice.reducer;
