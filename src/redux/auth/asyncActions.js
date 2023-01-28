import { createAsyncThunk } from "@reduxjs/toolkit";

import { $host, $authHost } from "../../axios";

export const userAuth = createAsyncThunk("auth/userAuth", async (params, thunkAPI) => {
  try {
    const { username, password } = params;
    const res = await $authHost.post(`/auth/login`, { username, password });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export const userCheck = createAsyncThunk("auth/userCheck", async (_, thunkAPI) => {
  try {
    const res = await $host.get(`/auth/check`);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});
