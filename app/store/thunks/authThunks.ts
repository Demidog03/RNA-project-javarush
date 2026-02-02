import {createAsyncThunk} from "@reduxjs/toolkit";
import {LoginBody} from "@/app/apis/authApi.types";
import authApi from "@/app/apis/authApi";

export const loginThunk = createAsyncThunk(
    'auth/loginThunk',
    async (body: LoginBody) => {
        const res = await authApi.login(body)
        return res.data
    }
)

export const getProfileThunk = createAsyncThunk(
    'auth/getProfileThunk',
    async (token: string) => {
        const res = await authApi.getProfile(token)
        return res.data
    }
)