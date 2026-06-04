import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TemperatureUnit, SpeedUnit } from "../../types/weather/types.js";

// intialize the state for the slice
const initialState: { temperatureUnit: TemperatureUnit; speedUnit: SpeedUnit } =
  { temperatureUnit: "fahrenheit", speedUnit: "kmh" };

const weatherSlice = createSlice({
  name: "weatherConfig",
  initialState,

  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.temperatureUnit = action.payload;
    },

    setSpeedUnit: (state, action: PayloadAction<SpeedUnit>) => {
      state.speedUnit = action.payload;
    },
  },
});

export const { setTemperatureUnit, setSpeedUnit } = weatherSlice.actions;
export default weatherSlice.reducer;
