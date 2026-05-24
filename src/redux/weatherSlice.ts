import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

// intialize the state for the slice
const initialState = {
    temperatureUnit: 'fahrenheit', // celcius is default in the api
    speedUnit: '' // kmh is by default in the api
}

const weatherSlice = createSlice({
    name: 'weatherConfig',
    initialState, 

    reducers: {
        setTemperatureUnit: (state, action: PayloadAction<any>) => {
            state.temperatureUnit = action.payload;
        },

        setSpeedUnit: (state, action: PayloadAction<any>) => {
            state.speedUnit = action.payload
        }
    }
})


export const {setTemperatureUnit, setSpeedUnit} = weatherSlice.actions;
export default weatherSlice.reducer;