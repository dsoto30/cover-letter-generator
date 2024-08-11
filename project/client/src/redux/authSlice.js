import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    error: null,
    isResumeUploaded: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isResumeUploaded = false;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        setIsResumeUploaded: (state, action) => {
            state.isResumeUploaded = action.payload;
        },
    },
});

export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
export const selectIsResumeUploaded = (state) => state.auth.isResumeUploaded;
export const { setUser, setLoading, logout, setError, setIsResumeUploaded } =
    authSlice.actions;
