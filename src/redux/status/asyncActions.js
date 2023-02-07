import { createAsyncThunk } from "@reduxjs/toolkit";

import { $host } from "../../axios";

export const fetchStatus = createAsyncThunk("status/fetchStatus", async (params, thunkAPI) => {
  try {
    const { data } = await $host.get(`/status`, {
      params: params,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export const createStatus = createAsyncThunk("status/createStatus", async (params, thunkAPI) => {
  try {
    const { data } = await $host.post(`/status`, params);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export const deleteStatus = createAsyncThunk("status/deleteStatus", async (params, thunkAPI) => {
  try {
    const { data } = await $host.delete(`/status/${params.id}`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export const editStatus = createAsyncThunk("status/editStatus", async (params, thunkAPI) => {
  try {
    const { data } = await $host.patch(`/status/${params.id}`, { name: params.name });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});
