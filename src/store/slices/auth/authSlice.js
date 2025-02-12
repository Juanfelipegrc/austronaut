import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        status: 'not-authenticated',
        displayName: '',
        email: '',
        uid: '',
        error: '',
        darkMode: typeof window !== undefined && localStorage.getItem('theme') === 'dark',
    },
    reducers: {
        login: (state, {payload}) =>{
            state.status = 'authenticated';
            state.displayName = payload.displayName;
            state.email = payload.email;
            state.uid = payload.uid;
        },

        logout: (state) => {
            state.status = 'not-authenticated';
            state.displayName = '';
            state.email = '';
            state.uid = '';
        },

        chenckingCredentials: (state) => {
            state.status = 'checking';
        },

        setDarkMode: (state, {payload}) => {
            state.darkMode = payload;
        },

        setError: (state, {payload}) => {
            state.error = payload;
        }
    }
});


export const { login, logout, chenckingCredentials, setDarkMode, setError } = authSlice.actions;