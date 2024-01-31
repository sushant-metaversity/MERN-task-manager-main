import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// const token = localStorage.getItem("TokenId");

// let REACT_APP_API_URL = process.env.REACT_APP_API_URL;
// axios.defaults.headers.common.Authorization = `Bearer ${token}`
const apiKey = process.env.REACT_APP_API_URL



export const postSignUp = createAsyncThunk('auth/postSignUp', async (data, { rejectWithValue }) => {
    try {
        const postSignUpRespose = await axios.post(`${apiKey}auth/signup`, data,
            {
                validateStatus: false
            });
        // window.location.replace("./home");
        // localStorage.clear();
        return postSignUpRespose
    } catch (err) {
        if (err) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const postLogin = createAsyncThunk('auth/postLogin', async (login, { rejectWithValue }) => {
    try {
        const postsLoginRespose = await axios.post(`${apiKey}auth/login`, login,
            {
                validateStatus: false
            });
        // window.location.replace("./home");
        // localStorage.clear();
        return postsLoginRespose
    } catch (err) {
        if (err) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
