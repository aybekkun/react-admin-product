import { createAsyncThunk } from "@reduxjs/toolkit";

import { $host } from "../../axios";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (params, thunkAPI) => {
  try {
    const { data } = await $host.get(`/order`, {
      params: params,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

