import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from './weatherSlice.js'

export const store = configureStore({
    reducer: {
        weatherConfig: weatherReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;