import {createSlice, type PayloadAction} from '@reduxjs/toolkit';


const initialState = {
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'authConfig',
    initialState,

    reducers: {
        signIn: (state, action: PayloadAction<any>) => {
            
        }
    }
})