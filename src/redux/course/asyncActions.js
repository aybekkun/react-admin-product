import { createAsyncThunk } from "@reduxjs/toolkit";

import { $host } from "../../axios";

export const fetchCourse = createAsyncThunk("course/fetchCourse", async (params, thunkAPI) => {
  try {
    const { data } = await $host.get(`/course`, {
      params: params,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export const createCourse = createAsyncThunk("course/createCourse", async (params, thunkAPI) => {
  try {
    const { data } = await $host.post(`/course`, params);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export const deleteCourse = createAsyncThunk("course/deleteCourse", async (params, thunkAPI) => {
  try {
    const { data } = await $host.delete(`/course/${params.id}`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});
