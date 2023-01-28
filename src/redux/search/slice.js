import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
const initialState = {
  searchParams: {
    name: "",
    phone: "",
    from: null,
    to: null,
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchName(state, action) {
      state.searchParams.name = action.payload;
    },
    setSearchPhone(state, action) {
      state.searchParams.phone = action.payload;
    },
    setSearchFrom(state, action) {
      const newDate = dayjs(action.payload).format("YYYY-MM-DD");
      state.searchParams.from = newDate;
    },
    setSearchTo(state, action) {
      const newDate = dayjs(action.payload).format("YYYY-MM-DD");
      state.searchParams.to = newDate;
    },
    setSearchClean(state) {
      state.searchParams = {
        name: "",
        phone: "",
        from: null,
        to: null,
      };
    },
  },
  //   extraReducers: (builder) => {},
});

// Action creators are generated for each case reducer function
export const { setSearchName, setSearchPhone, setSearchFrom, setSearchTo, setSearchClean } = searchSlice.actions;

export default searchSlice.reducer;
