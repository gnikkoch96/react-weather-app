import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from './weatherSlice.js'

export const store = configureStore({
    reducer: {
        weatherConfig: weatherReducer
    }
})


