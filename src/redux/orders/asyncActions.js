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

export const createOrdersComment = createAsyncThunk("orders/createOrdersComment", async (params, thunkAPI) => {
  try {
    const { id, ...comment } = params;
    const { data } = await $host.patch(`/order/${id}`, comment);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});
