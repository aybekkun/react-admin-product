import { createSlice } from "@reduxjs/toolkit";
import { createCourse, fetchCourse } from "./asyncActions";

const initialState = {
  data: [],
  total: 0,
  currentPage: 1,
  isLoading: false,
  isSending: false,
  count: 0,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseCount(state, action) {
      state.count++;
    },
    setCoursePage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(fetchCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourse.rejected, (state) => {
      state.isLoading = false;
      state.data = [];
      state.total = 0;
    });
    builder.addCase(createCourse.fulfilled, (state, action) => {
      state.isSending = false;
    });
    builder.addCase(createCourse.pending, (state) => {
      state.isSending = true;
    });
    builder.addCase(createCourse.rejected, (state) => {
      state.isSending = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setCourseCount, setCoursePage } = courseSlice.actions;

export default courseSlice.reducer;
