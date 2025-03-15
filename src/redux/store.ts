import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import issueReducer from "./slice/issueSlice";
import repoReducer from "./slice/repoSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["issues"],
};

const rootReducer = combineReducers({
  issues: issueReducer,
  repo: repoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
