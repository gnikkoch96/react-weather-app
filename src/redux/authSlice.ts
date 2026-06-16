import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import { validUsers } from '../data/userCredentials.js';

type UserCredential = {
    username: string;
    password: string;
}

const initialState = {

}

const authSlice = createSlice({
    name: 'authConfig',
    initialState,

    reducers: {
        signIn: (state, action: PayloadAction<UserCredential>) => {
            // what is expected from this function is a JSON of their user and pass 
        }
    }
})