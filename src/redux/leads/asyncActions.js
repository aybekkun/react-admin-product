import { createAsyncThunk } from "@reduxjs/toolkit";

import { $host } from "../../axios";

export const fetchLeads = createAsyncThunk("leads/fetchLeads", async (params, thunkAPI) => {
  try {
    const { data } = await $host.get(`/lead`, {
      params: params,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export const createLeadsComment = createAsyncThunk("leads/createLeadsComment", async (params, thunkAPI) => {
  try {
    const { id, ...comment } = params;
    const { data } = await $host.patch(`/lead/${id}`, comment);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});
