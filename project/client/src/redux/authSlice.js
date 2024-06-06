import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
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
        },
    },
});

export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;
export const { setUser, setLoading, logout } = authSlice.actions;
