import { createSlice } from "@reduxjs/toolkit";
import { createBot, createSendMessage, fetchSetting } from "./asyncActions";

const initialState = {
  data: {
    id: 0,
    bot_token: "",
    bot_username: "",
    bot_chat_id: "",
    contact: "",
    status: 0,
    isSending:false,
    isSendingMessage:false,
    createdAt: "",
  },
  isLoading: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSetting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchSetting.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSetting.rejected, (state) => {
      state.isLoading = false;
      state.data = [];
    });
    builder.addCase(createBot.fulfilled, (state, action) => {
      state.isSending = false;
    });
    builder.addCase(createBot.pending, (state) => {
      state.isSending = true;
    });
    builder.addCase(createBot.rejected, (state) => {
      state.isSending = false;
    });
    builder.addCase(createSendMessage.fulfilled, (state) => {
      state.isSendingMessage = false;
    });
    builder.addCase(createSendMessage.pending, (state) => {
      state.isSendingMessage = true;
    });
    builder.addCase(createSendMessage.rejected, (state) => {
      state.isSendingMessage = false;
    });
  },
});

//export const { setLeadPage } = settingsSlice.actions;

export default settingsSlice.reducer;
