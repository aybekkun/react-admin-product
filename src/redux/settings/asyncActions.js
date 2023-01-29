import { createAsyncThunk } from "@reduxjs/toolkit";

import { $host } from "../../axios";

export const fetchSetting = createAsyncThunk("settings/fetchSetting", async (params, thunkAPI) => {
  try {
    const { data } = await $host.get(`/setting`, {
      params: params,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export const createContactInfo = createAsyncThunk("settings/createContactInfo", async (params, thunkAPI) => {
  try {
    const { data } = await $host.patch(`/setting`, params);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});


export const createBot = createAsyncThunk("settings/createBot", async (params, thunkAPI) => {
  try {
    const { data } = await $host.post(`/setting`, params);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export const deleteBot = createAsyncThunk("settings/deleteBot", async (_, thunkAPI) => {
  try {
    const { data } = await $host.delete(`/setting`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export const createSendMessage = createAsyncThunk("settings/createSendMessage", async (params, thunkAPI) => {
  try {
    const { data } = await $host.post(`/setting/sendMessage`, params);
    return data;
  } catch (error) {
    alert("Message did not send")
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});
