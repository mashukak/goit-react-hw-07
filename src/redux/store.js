import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage or sessionStorage
import { combineReducers } from "redux";
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";

// Create persist configuration
const persistConfig = {
  key: "root", // key for the persisted state
  storage, // Choose storage method (localStorage by default)
};

// Combine your reducers
const rootReducer = combineReducers({
  contacts: contactsReducer,
  filters: filtersReducer,
});

// Wrap the combined reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Disable serializability checks for redux-persist actions
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore persist-related actions
        ignoredPaths: ['register'], // Optionally, ignore specific paths
      },
    }),
});

export const persistor = persistStore(store); // Create persistor
