import { createAsyncThunk } from "@reduxjs/toolkit";

import { $host, $authHost } from "../../axios";

export const fetchCourses = createAsyncThunk("publicForm/fetchCourses", async (params, thunkAPI) => {
  try {
    const res = await $authHost.get(`/course/all`);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export const createOrder = createAsyncThunk("publicForm/createOrder", async (params, thunkAPI) => {
  try {
    const res = await $authHost.post(`/order/create/public`,params);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});
