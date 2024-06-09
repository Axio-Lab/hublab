"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import profileReducer from "../store/slices/profileSlice";
import campaignReducer from "./slices/campaignSlice";
import stateReducer from "../store/slices/statesSlice";
import productReducer from "../store/slices/productSlice";
import collectionReducer from "../store/slices/collectionSlice";
import dashboardReducer from "../store/slices/dashboardSlice";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  blackList: ["profile"],
};

const rootReducer = combineReducers({
  profile: profileReducer,
  campaign: campaignReducer,
  generalStates: stateReducer,
  product: productReducer,
  collection: collectionReducer,
  dashboard: dashboardReducer,
});

const persistedReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducers,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const root = store.getState();
export const persistor = persistStore(store);
export default store;
