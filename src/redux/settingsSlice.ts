import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    isVisible: false
}

const settingsSlice = createSlice({
    name: 'settingsConfig',
    initialState,

    reducers: {
        setIsVisible: (state, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload;
        }
    }
})


export const {setIsVisible} = settingsSlice.actions;
export default settingsSlice.reducer;