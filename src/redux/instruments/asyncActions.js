import { createAsyncThunk } from "@reduxjs/toolkit";

import { $host } from "../../axios";

export const fetchInstruments = createAsyncThunk("instruments/fetchInstruments", async (params, thunkAPI) => {
  try {
    const { data } = await $host.get(`/instrument`, {
      params: params,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export const createInstruments = createAsyncThunk("instruments/createInstruments", async (params, thunkAPI) => {
  try {
    const { data } = await $host.post(`/instrument`, params);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});
