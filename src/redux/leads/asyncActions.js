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
