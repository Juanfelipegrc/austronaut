import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        status: 'not-authenticated',
        displayName: '',
        email: '',
        uid: '',
        photoURL: '',
        noPhotoURLColor: '',
        error: '',
        chats: [],
        darkMode: typeof window !== undefined && localStorage.getItem('theme') === 'dark',
    },
    reducers: {
        login: (state, {payload}) =>{
            state.status = 'authenticated';
            state.displayName = payload.displayName;
            state.email = payload.email;
            state.uid = payload.uid;
            state.photoURL = payload.photoURL;
            state.noPhotoURLColor = payload.noPhotoURLColor
        },

        logout: (state) => {
            state.status = 'not-authenticated';
            state.displayName = '';
            state.email = '';
            state.uid = '';
            state.photoURL = '';
            state.chats = '';
            state.noPhotoURLColor = '';
        },

        chenckingCredentials: (state) => {
            state.status = 'checking';
        },

        setDarkMode: (state, {payload}) => {
            state.darkMode = payload;
        },

        setError: (state, {payload}) => {
            state.error = payload;
        },

        setChats: (state, {payload}) => {
            state.chats = payload;
        }
    }
});


export const { login, logout, chenckingCredentials, setDarkMode, setError, setChats } = authSlice.actions;