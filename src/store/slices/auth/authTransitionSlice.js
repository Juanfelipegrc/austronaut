import { createSlice } from '@reduxjs/toolkit';


export const authTransitionSlice = createSlice({
    name: 'authTransitionSlice',
    initialState: {
        expanded: false,
        modalIsOpen: false,
        showAuth: false,
        showLoginButton: true,

    },
    reducers: {
        setExpanded: (state, {payload}) =>{
            state.expanded = payload;
        },
        setModalIsOpen: (state, {payload}) =>{
            state.modalIsOpen = payload;
        },
        setShowAuth: (state, {payload}) =>{
            state.showAuth = payload;
        },
        setShowLoginButton: (state, {payload}) =>{
            state.showLoginButton = payload;
        },
    }
});


export const { setExpanded, setShowLoginButton, setModalIsOpen, setShowAuth } = authTransitionSlice.actions;