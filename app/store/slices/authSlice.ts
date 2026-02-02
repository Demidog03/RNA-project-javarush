import {createSlice} from "@reduxjs/toolkit";
import {getProfileThunk, loginThunk} from "@/app/store/thunks/authThunks";

interface UserProfile {
    id: string;
    name: string;
    email: string;
}

interface AuthSliceInitialState {
    token: string | null;
    profile: UserProfile | null
    loginPending: boolean;
    getProfilePending: boolean
}

const initialState: AuthSliceInitialState = {
    token: null,
    profile: null,
    loginPending: false,
    getProfilePending: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearToken: (state) => {
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.token = action.payload.accessToken
                state.loginPending = false
            })
            .addCase(loginThunk.pending, (state, action) => {
                state.loginPending = true
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.token = null
                state.profile = null
                state.loginPending = false
            })
            .addCase(getProfileThunk.fulfilled, (state, action) => {
                state.profile = action.payload
                state.getProfilePending = false
            })
            .addCase(getProfileThunk.pending, (state, action) => {
                state.getProfilePending = true
            })
            .addCase(getProfileThunk.rejected, (state, action) => {
                state.token = null
                state.profile = null
                state.getProfilePending = false
            })
    }
})

export const {clearToken} = authSlice.actions;

export default authSlice.reducer