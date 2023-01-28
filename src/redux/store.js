import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./auth/slice.js";
import effect from "./effect/slice";
import leads from "./leads/slice";
import orders from "./orders/slice";
import search from "./search/slice";
import course from "./course/slice";
import instruments from "./instruments/slice";
import settings from "./settings/slice";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const authReducer = persistReducer(persistConfig, auth);

const store = configureStore({
  reducer: {
    auth: authReducer,
    effect,
    leads,
    search,
    orders,
    course,
    instruments,
    settings
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export default store;
