import { configureStore } from "@reduxjs/toolkit";
import effect from "./effect/slice";
const store = configureStore({
  reducer: {
    effect,
  },
});

export default store;
