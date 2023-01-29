import { createSlice } from "@reduxjs/toolkit";
import { createOrdersComment, fetchOrders } from "./asyncActions";

const initialState = {
  data: [],
  total: 0,
  currentPage: 1,
  isLoading: false,
  isSendingComment: false,
  
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrderPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.isLoading = false;
      state.data = [];
      state.total = 0;
    });
    builder.addCase(createOrdersComment.fulfilled, (state, action) => {
      state.isSendingComment = false;
    });
    builder.addCase(createOrdersComment.pending, (state) => {
      state.isSendingComment = true;
    });
    builder.addCase(createOrdersComment.rejected, (state) => {
      state.isSendingComment = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setLeadPage } = ordersSlice.actions;

export default ordersSlice.reducer;
