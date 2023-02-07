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
export const createLead = createAsyncThunk("leads/createLead", async (params, thunkAPI) => {
  try {
    const { data } = await $host.post(`/lead`, params);
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

export const editUserStatus = createAsyncThunk("leads/createLeadsComment", async (params, thunkAPI) => {
  try {
    const { data } = await $host.patch(`/lead/${params.id}`, { real_status: params.statusId });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});
