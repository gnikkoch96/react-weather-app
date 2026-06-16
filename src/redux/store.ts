import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from './weatherSlice.js';
import settingsReducer from './settingsSlice.js';
import authReducer from './authSlice.js';

export const store = configureStore({
    reducer: {
        weatherConfig: weatherReducer,
        settingsConfig: settingsReducer,
        authConfig: authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;