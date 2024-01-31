import { createSlice } from '@reduxjs/toolkit'
import {
    postLogin, postSignUp

} from './authActions'

const INITAL_STATE = {
    MrqueeClose: true,

    auth: '',
    authLoading: false,
    authError: null,

    data: null,
    dataLoading: false,
    dataError: null,

    postLoginData: null,
    postLoginDataLoading: false,
    postLoginDataError: null,

    postSignUpData: null,
    postSignUpDataLoading: false,
    postSignUpDataError: null,


}

const authSlice = createSlice({
    name: "auth",
    initialState: INITAL_STATE,
    reducers: {
        setMrqueeClose: (state, action) => {
            state.MrqueeClose = action.payload;
        },
        clearLoginInfo: (state) => {
            state.postLoginData = null
        }
    },
    extraReducers: bulder => {
        bulder.addCase(postLogin.pending, (state) => {
            state.postLoginData = null;
            state.postLoginDataLoading = true;
            state.postLoginDataError = null;
        }).addCase(postLogin.rejected, (state, action) => {
            state.postLoginData = null;
            state.postLoginDataLoading = false;
            state.postLoginDataError = action.error.message;
        }).addCase(postLogin.fulfilled, (state, action) => {
            state.postLoginData = action.payload;
            state.postLoginDataLoading = false;
            state.postLoginDataError = null;
        })
        bulder.addCase(postSignUp.pending, (state) => {
            state.postSignUpData = null;
            state.postSignUpDataLoading = true;
            state.postSignUpDataError = null;
        }).addCase(postSignUp.rejected, (state, action) => {
            state.postSignUpData = null;
            state.postSignUpDataLoading = false;
            state.postSignUpDataError = action.error.message;
        }).addCase(postSignUp.fulfilled, (state, action) => {
            state.postSignUpData = action.payload;
            state.postSignUpDataLoading = false;
            state.postSignUpDataError = null;
        })
    }
});

export const { setMrqueeClose, clearLoginInfo, clearPostPlaceBet } = authSlice.actions;
export default authSlice.reducer